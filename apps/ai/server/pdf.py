import os
import cv2
import pytesseract
import base64
from langchain.docstore.document import Document
from PIL import Image
from io import BytesIO
import pandas as pd
from pdfplumber import open as pdf_open
from wrappers.langchain_instrumentation_method_wrapper import langchain_instrumentation_method_wrapper
from config_wizards.server_config_wizard import ServerConfigWizard
from llm import LLM
from tracer import Tracer

class PDF():
    @classmethod
    def get_documents(cls, filepath):
        all_pdf_documents = []
        ongoing_tables = {}
        try:
            f = pdf_open(filepath)
        except Exception as e:
            print(f"Error opening or processing the PDF file: {e}")
            return []
        
        for page_number, page in enumerate(f.pages):
            try:
                page_docs = []

                # Define thresholds for header and footer (10% of the page height)
                page_height = page.height
                header_threshold = page_height * 0.1
                footer_threshold = page_height * 0.9

                # Crop out page to remove footers and headers
                #page_crop = page.crop([0,header_threshold,page.width,footer_threshold])
                text_blocks = [obj for obj in page.chars if obj['object_type'] == 'char']
                grouped_text_blocks = cls.process_text_blocks(
                    text_blocks
                )

                if len(grouped_text_blocks) == 0:
                    # Perform OCR on PDF pages
                    ocr_docs = cls.parse_via_ocr(filepath, page, page_number)
                    page_docs.extend(ocr_docs) 
                # Extract tables and their bounding boxes
                table_docs, table_bboxes, ongoing_tables = cls.parse_all_tables(filepath, page, page_number, text_blocks, ongoing_tables)
                page_docs.extend(table_docs)

                # Extract and process images
                image_docs = cls.parse_all_images(filepath, page, page_number, text_blocks)
                page_docs.extend(image_docs)

                # Process text blocks
                text_block_ctr = 0
                for heading_block, content in grouped_text_blocks:
                    text_block_ctr +=1
                    heading_bbox = (heading_block['x0'],heading_block['y0'],heading_block['x1'],heading_block['y1'])
                    # Check if the heading or its content overlaps with table or image bounding boxes
                    if not any(cls.is_bbox_overlapping(heading_bbox,table_bbox) for table_bbox in table_bboxes):
                        bbox = {
                            "x1": heading_bbox[0], 
                            "y1": heading_bbox[1], 
                            "x2": heading_bbox[2], 
                            "x3": heading_bbox[3]
                        }
                        text_doc = Document(page_content=f"{heading_block['text']}\n{content}", metadata={**bbox, "type": "text", "page_num": page_number, "source": f"{os.path.basename(filepath)}"})
                        page_docs.append(text_doc)
                all_pdf_documents.append(page_docs)
            except Exception as e:
                print(f"Skipping the page {page_number} due to Exception {e}")
        f.close()
        return all_pdf_documents
    
    @classmethod
    def parse_via_ocr(cls, filename, page, page_number):
        ocr_docs = []
        ocr_image = page.to_image(resolution=109)
        imgrefpath = os.path.join("/tmp-data", "multimodal/ocr_references")
        if not os.path.exists(imgrefpath):
            os.makedirs(imgrefpath)
        image_path = os.path.join(imgrefpath, f"page{page_number}.png")
        ocr_image.save(image_path)
        img = cv2.imread(image_path)
        ocr_text = pytesseract.image_to_string(img)
        ocr_metadata = {
            "x1":0,
            "y1":0,
            "x2":0,
            "x3":0,
            "source": f"{os.path.basename(filename)}",
            "image": image_path,
            "caption": ocr_text,
            "type": "image",
            "page_num": page_number
        }

        ocr_docs.append(Document(page_content="This is a page with text: " + ocr_text, metadata=ocr_metadata))
        return ocr_docs
    
    @classmethod
    def process_text_blocks(cls, text_blocks):
        char_count_threshold = 500
        current_group = []
        grouped_blocks = []
        current_char_count = 0
        for block in text_blocks:
            if block['object_type'] in ('char','str'):
                block_text = block['text']
                block_char_count = len(block_text)

                if current_char_count + block_char_count <= char_count_threshold:
                    current_group.append(block)
                    current_char_count += block_char_count
                else:
                    if current_group:
                        grouped_content = " ".join([b['text'] for b in current_group])
                        grouped_blocks.append((current_group[0], grouped_content))
                    current_group = [block]
                    current_char_count = block_char_count

        if current_group:
            grouped_content = "".join([b['text'] for b in current_group])
            grouped_blocks.append((current_group[0], grouped_content))

        return grouped_blocks
    
    @classmethod
    def parse_all_images(cls, filename, page, page_number, text_blocks):
        image_docs = []
        image_list = page.images
        # image_info_list = page.get_image_info(xrefs=True)
        # page_rect = page.rect  # Get the dimensions of the page

        for image_num, image in enumerate(image_list):
            # xref = image_info['xref']
            # if xref == 0:
            #     continue  # Skip inline images or undetectable images
                image_bbox = (image['x0'],image['y0'], image['x1'],image['y1'])
                # Check if the image size is at least 5% of the page size in any dimension
                if image["width"] < page.width / 20 or image["height"] < page.height / 20:
                    continue  # Skip very small images

                # Extract and save the image
                page_crop = page.crop(image_bbox,strict=False)
                image_data = page_crop.to_image()
                imgrefpath = os.path.join("/tmp-data", "multimodal/image_references")
                if not os.path.exists(imgrefpath):
                    os.makedirs(imgrefpath)
                image_path = os.path.join(imgrefpath, f"image{image_num}-page{page_number}.png")
                image_data.save(image_path)
                # Find text around the image
                before_text, after_text = cls.extract_text_around_item(text_blocks, image_bbox, page.height)
                # skip images without a caption, they are likely just some logo or graphics
                if before_text == "" and after_text == "":
                    continue

                # Process the image if it's a graph
                image_description = " "
                if cls.is_graph(image_path):
                    image_description = cls.process_graph(image_path)

                # Combine the texts to form a caption
                caption = before_text.replace("\n", " ") + image_description + after_text.replace("\n", " ")

                image_metadata = {
                    "x1":0,
                    "y1":0,
                    "x2":0,
                    "x3":0,
                    "source": f"{os.path.basename(filename)}",
                    "image": image_path,
                    "caption": caption,
                    "type": "image",
                    "page_num": page_number
                }

                image_docs.append(Document(page_content="This is an image with the caption: " + caption, metadata=image_metadata))

        return image_docs
    
    @classmethod
    def extract_text_around_item(
            cls, 
            text_blocks, 
            bbox, 
            page_height, 
            threshold_percentage=0.1
    ):
        before_text, after_text = "", ""

        vertical_threshold_distance = page_height * threshold_percentage
        horizontal_threshold_distance = (bbox[2]-bbox[0]) * threshold_percentage  # Assuming similar threshold for horizontal distance

        for block in text_blocks:
            vertical_distance = min(abs(block['y1'] - bbox[1]), abs(block['y0'] - bbox[3]))
            horizontal_overlap = max(0, min(block['x1'], bbox[3]) - max(block['x0'], bbox[0]))

            # Check if within vertical threshold distance and has horizontal overlap or closeness
            if vertical_distance <= vertical_threshold_distance and horizontal_overlap >= -horizontal_threshold_distance:
                if block['y1'] < bbox[1] and not before_text:
                    before_text = block['text']
                elif block['y0'] > bbox[2] and not after_text:
                    after_text = block['text']
                    break

        return before_text, after_text
    
    @classmethod
    def parse_all_tables(
        cls,
        filename, 
        page, 
        page_number, 
        text_blocks, 
        ongoing_tables
    ):
        table_docs = []
        table_bboxes = []
        ctr = 1
        try: 
            tables = page.find_tables(table_settings={"horizontal_strategy":"lines_strict", "vertical_strategy":"lines_strict"})
        except Exception as e:
            print(f"Error during table extraction: {e}")
            return table_docs, table_bboxes, ongoing_tables
        if tables:
            for table_num, table in enumerate(tables, start=1):
                    try:
                        tablerefdir = os.path.join("/tmp-data", "vectorstore/table_references")
                        if not os.path.exists(tablerefdir):
                            os.makedirs(tablerefdir)
                        df_xlsx_path = os.path.join(tablerefdir, f"table{table_num}-page{page_number}.xlsx")
                        page_crop=page.crop(table.bbox)
                        if len(page_crop.extract_tables())>0:
                            table_df_text = page_crop.extract_tables()[0]
                            table_df = cls.text_to_table(table_df_text)
                            table_df.to_excel(df_xlsx_path)
                            # Find text around the table
                            table_bbox = table.bbox
                            before_text, after_text = cls.extract_text_around_item(text_blocks, table_bbox, page.height)
                            # Save table image
                            table_img_path = os.path.join(tablerefdir, f"table{table_num}-page{page_number}.jpg")
                            img = page_crop.to_image(resolution=109)
                            img.save(table_img_path)
                            description = cls.process_graph(table_img_path)
                            ctr +=1
                            caption = before_text.replace("\n", " ") + description + after_text.replace("\n", " ")
                            if before_text == "" and after_text == "":
                                caption = " ".join(table_df.columns)
                            table_data_text = cls.stringify_table(table_df_text)
                            table_metadata = {
                                "x1":0,
                                "y1":0,
                                "x2":0,
                                "x3":0,
                                "source": f"{os.path.basename(filename)}",
                                "dataframe": df_xlsx_path,
                                "image": table_img_path,
                                "caption": caption,
                                "type": "table",
                                "page_num": page_number + 1
                            }
                            all_cols = ", ".join(list(table_df.columns.values))
                            doc = Document(page_content="This is a table with the caption: " + caption + f"\nThe columns are {all_cols} and the table data is {table_data_text}", metadata=table_metadata)
                            table_docs.append(doc)
                    except:
                        print(f"Skipping Table {table_num} due to Exception {e}")
        return table_docs, table_bboxes, ongoing_tables
    
    @classmethod
    def is_bbox_overlapping(cls, bbox1, bbox2):
        return (bbox1[0]<bbox2[2] and bbox1[2]>bbox2[0] and bbox1[1]>bbox2[3] and bbox1[3]<bbox2[1])
    
    @classmethod
    def is_graph(cls, image_path):
        neva = LLM("nvidia/neva-22b", callback_handler=Tracer.langchain_callback_handler)
        b64_string = cls.get_b64_image(image_path)
        res = neva.multimodal_invoke(
            b64_string, 
            creativity = 0, 
            quality = 9, 
            complexity = 0, 
            verbosity = 9
        ).content
        if "graph" in res or "plot" in res or "chart" in res:
            return True
        else:
            return False

    @classmethod   
    def process_graph(cls, image_path):
        deplot = LLM("google/deplot")
        b64_string = cls.get_b64_image(image_path)
        res = deplot.multimodal_invoke(b64_string)
        deplot_description = res.content
        settings = ServerConfigWizard.get_config()
        mixtral = LLM(
            model_name=settings.llm.model_name, 
            is_response_generator=True, 
            callback_handler=Tracer.langchain_callback_handler
        )
        prompt="Explain the following linearized table. " + deplot_description
        system_prompt="Your responsibility is to explain charts. You are an expert in describing the responses of linearized tables into plain English text for LLMs to use."
        response = mixtral.chat_with_prompt(
            system_prompt,
            {
                "input": prompt
            }
        )
        full_response = ""
        for chunk in response:
            full_response += chunk
        return full_response
    
    @classmethod
    def get_b64_image(cls, image_path):
        image = Image.open(image_path).convert("RGB")
        buffered = BytesIO()
        image.save(buffered, format="JPEG", quality=20)
        b64_string = base64.b64encode(buffered.getvalue()).decode("utf-8")
        return b64_string
    
    @classmethod
    def text_to_table(cls, table_text):
        columns = []
        rows = []
        try:
            for i in range(len(table_text)):
                columns.append(table_text[i][0])
            for i in range(1,len(table_text[0])):
                row=[]
                for j in range(len(columns)):
                    row.append(table_text[j][i])
                rows.append(row)
        except Exception as e:
            print(f"Exception occured while converting extracted table text to Dataframe object : {e}")
        return pd.DataFrame(rows,columns=columns)
    
    @classmethod
    def extract_text_around_item(
        cls,
        text_blocks, 
        bbox, 
        page_height, 
        threshold_percentage=0.1
    ):
        before_text, after_text = "", ""

        vertical_threshold_distance = page_height * threshold_percentage
        horizontal_threshold_distance = (bbox[2]-bbox[0]) * threshold_percentage  # Assuming similar threshold for horizontal distance

        for block in text_blocks:
            vertical_distance = min(abs(block['y1'] - bbox[1]), abs(block['y0'] - bbox[3]))
            horizontal_overlap = max(0, min(block['x1'], bbox[3]) - max(block['x0'], bbox[0]))

            # Check if within vertical threshold distance and has horizontal overlap or closeness
            if vertical_distance <= vertical_threshold_distance and horizontal_overlap >= -horizontal_threshold_distance:
                if block['y1'] < bbox[1] and not before_text:
                    before_text = block['text']
                elif block['y0'] > bbox[2] and not after_text:
                    after_text = block['text']
                    break

        return before_text, after_text
    
    @classmethod
    def stringify_table(cls, table_text):
        ans = ""
        for i in range(len(table_text)):
            for j in range(len(table_text[i])):
                ans += table_text[i][j] + ","
            ans += "\n"
        return ans
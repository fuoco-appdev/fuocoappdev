import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import {
  DeepLTranslateRequest,
  DeepLTranslateResponse,
  DeepLTranslationsResponse,
} from "../protobuf/deepl_pb.js";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

class DeepLService {
  private _authKey: string | undefined;
  constructor() {
    this._authKey = Deno.env.get("DEEPL_AUTH_KEY");

    if (!this._authKey) {
      throw new Error("DEEPL_AUTH_KEY doesn't exist");
    }
  }

  public async translateAsync(
    request: InstanceType<typeof DeepLTranslateRequest>,
  ): Promise<InstanceType<typeof DeepLTranslationsResponse>> {
    const response = new DeepLTranslationsResponse();
    const text = request.getText();
    const languageCode = request.getLanguageCode();
    try {
      const translatedResponse = await axiod.post(
        `https://api-free.deepl.com/v2/translate`,
        {
          text: [text],
          target_lang: languageCode,
        },
        {
          headers: {
            Authorization: `DeepL-Auth-Key ${this._authKey}`,
          },
        },
      );

      for (
        const translation of translatedResponse.data[
          "translations"
        ] as Record<string, string>[]
      ) {
        const translateResponse = new DeepLTranslateResponse();
        translateResponse.setDetectedSourceLanguage(
          translation?.["detected_source_language"] ?? "",
        );
        translateResponse.setText(translation?.["text"] ?? "");
        response.addTranslations(translateResponse);
      }
    } catch (error: any) {
      console.error(error);
    }
    return response;
  }
}

export default new DeepLService();

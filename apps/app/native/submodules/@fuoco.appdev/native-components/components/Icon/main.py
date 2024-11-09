
# import required module
import os
# assign directory
lineDirectory = 'Icons/Line'
solidDirectory = 'Icons/Solid'

# Icon folders
line = []
solid = []

def convertToNative(filename):
    with open(filename, "r") as file:
        data = file.read()
    
    data = data.replace("import * as React from 'react'", "import Svg, { Path } from 'react-native-svg';")
    data = data.replace("xmlns=\"http://www.w3.org/2000/svg\"", '')
    data = data.replace("<svg", "<Svg")
    data = data.replace("</svg>", "</Svg>")
    data = data.replace("<path", "<Path")
    data = data.replace("</path>", "</Path>")

    with open(filename, 'w') as file:
        file.write(data)

 
# iterate over files in line folder
for filename in os.listdir(lineDirectory):
    if filename == 'index.ts':
        continue

    convertToNative(lineDirectory + "/" + filename)
        
    f = os.path.join(lineDirectory, filename)
    # checking if it is a file
    if os.path.isfile(f):
        line.append(filename.replace('.tsx', ''))

# iterate over files in solid folder
for filename in os.listdir(solidDirectory):
    if filename == 'index.ts':
        continue

    convertToNative(solidDirectory + "/" + filename)

    f = os.path.join(solidDirectory, filename)
    # checking if it is a file
    if os.path.isfile(f):
        solid.append(filename.replace('.tsx', ''))

lineFile = open(lineDirectory + "/index.ts", "w")
for filename in line:
    exportString = "export {{ default as {0} }} from './{1}';\n"
    if (filename[0].isdigit()):
        lineFile.write(exportString.format("d" + filename, filename))
        continue

    lineFile.write(exportString.format(filename, filename))

lineFile.close()

solidFile = open(solidDirectory + "/index.ts", "w")
for filename in solid:
    exportString = "export {{ default as {0} }} from './{1}';\n"
    if (filename[0].isdigit()):
        solidFile.write(exportString.format("d" + filename, filename))
        continue

    solidFile.write(exportString.format(filename, filename))

solidFile.close()
const fs = require("fs");
const path = require("path");

const writeExportsInIndexFile = (exportsObject, jsSyntax = "commonjs") => {
  Object.entries(exportsObject).forEach(([folderPath, exportsArray]) => {
    let indexFileContent = "";

    exportsArray.forEach((exportsItem) => {
      if (typeof exportsItem === "object") {
        Object.entries(exportsItem).forEach(([key, value]) => {
          if (key !== "fileName") {
            if (typeof value === "function") {
              if (jsSyntax === "commonjs") {
                indexFileContent += `const ${key} = require('./${exportsItem.fileName}');\n`;
              } else if (jsSyntax === "es6") {
                indexFileContent += `export { default as ${key} } from './${exportsItem.fileName}';\n`;
              }
            }
          }
        });
      }
    });

    if (jsSyntax === "commonjs") {
      indexFileContent += `\nmodule.exports = {\n`;
      exportsArray.forEach((exportsItem) => {
        if (typeof exportsItem === "object") {
          Object.entries(exportsItem).forEach(([key, value]) => {
            if (key !== "fileName") {
              if (typeof value === "function") {
                indexFileContent += `  ${key},\n`;
              }
            }
          });
        }
      });
      indexFileContent += `};\n`;
    }

    fs.writeFileSync(path.join(folderPath, "index.js"), indexFileContent);
  });
};

module.exports = writeExportsInIndexFile;

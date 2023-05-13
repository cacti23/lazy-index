const fs = require("fs");
const path = require("path");

// Generates the import/export statements for a given exportsItem
const generateStatements = (exportsItem, jsSyntax) => {
  let statements = "";

  Object.entries(exportsItem).forEach(([key, value]) => {
    if (key !== "fileName" && typeof value === "function") {
      if (jsSyntax === "commonjs") {
        statements += `const ${key} = require('./${
          exportsItem.fileName.split(".")[0]
        }');\n`;
      } else if (jsSyntax === "es6") {
        statements += `export { default as ${key} } from './${
          exportsItem.fileName.split(".")[0]
        }';\n`;
      }
    }
  });

  return statements;
};

// Generates the module.exports object for CommonJS syntax
const generateCommonJSExports = (exportsArray) => {
  let exportsContent = "module.exports = {\n";

  exportsArray.forEach((exportsItem) => {
    Object.entries(exportsItem).forEach(([key, value]) => {
      if (key !== "fileName" && typeof value === "function") {
        exportsContent += `  ${key},\n`;
      }
    });
  });

  exportsContent += "};\n";

  return exportsContent;
};

// Main function to write exports in index file
const writeExportsInIndexFile = (exportsObject, jsSyntax = "commonjs") => {
  Object.entries(exportsObject).forEach(([folderPath, exportsArray]) => {
    let indexFileContent = "";

    exportsArray.forEach((exportsItem) => {
      if (typeof exportsItem === "object") {
        indexFileContent += generateStatements(exportsItem, jsSyntax);
      }
    });

    if (jsSyntax === "commonjs") {
      indexFileContent += generateCommonJSExports(exportsArray);
    }

    fs.writeFileSync(path.join(folderPath, "index.js"), indexFileContent);
  });
};

module.exports = writeExportsInIndexFile;

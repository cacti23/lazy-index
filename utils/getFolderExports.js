const fs = require("fs");
const path = require("path");

const getExportsFromFolder = (folderPath) => {
  const files = fs.readdirSync(folderPath);

  const exportArray = [];

  files.forEach((file) => {
    if (file !== "index.js") {
      const filePath = path.join(folderPath, file);

      if (fs.lstatSync(filePath).isFile()) {
        const fileExports = require(filePath);

        if (typeof fileExports === "object") {
          exportArray.push({ fileName: file, ...fileExports });
        } else {
          exportArray.push({ fileName: file, [fileExports.name]: fileExports });
        }
      }
    }
  });

  return exportArray;
};

const getFolderExports = (folders) => {
  const exportObject = {};

  folders.forEach((folderPath) => {
    exportObject[folderPath] = getExportsFromFolder(folderPath);
  });

  return exportObject;
};

module.exports = getFolderExports;

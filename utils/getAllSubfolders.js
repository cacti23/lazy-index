const fs = require("fs");
const path = require("path");

const getAllSubfolders = (dirPath, arrayOfFolders) => {
  const files = fs.readdirSync(dirPath);

  arrayOfFolders = arrayOfFolders || [];

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFolders.push(filePath);
      arrayOfFolders = getAllSubfolders(filePath, arrayOfFolders);
    }
  });

  return arrayOfFolders;
};

module.exports = getAllSubfolders;

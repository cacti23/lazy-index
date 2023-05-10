const fs = require("fs");
const path = require("path");

const checkPathExists = require("./checkPathExists");

const createIndexFile = async (folderPath) => {
  const indexFilePath = path.join(folderPath, "index.js");

  if (!(await checkPathExists(indexFilePath))) {
    fs.writeFileSync(indexFilePath, "");
  }
};

module.exports = createIndexFile;

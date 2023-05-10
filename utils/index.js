const checkPathExists = require("./checkPathExists");
const askForPermissionToProceed = require("./askForPermissionToProceed");
const askForLogicFolder = require("./askForLogicFolder");
const getAllSubfolders = require("./getAllSubfolders");
const createIndexFile = require("./createIndexFile");
const getFolderExports = require("./getFolderExports");
const askForJavascriptSyntax = require("./askForJavascriptSyntax");
const writeExportsInIndexFile = require("./writeExportsInIndexFile");
const chalkStyles = require("./chalkStyles");

module.exports = {
  checkPathExists,
  askForPermissionToProceed,
  askForLogicFolder,
  getAllSubfolders,
  createIndexFile,
  getFolderExports,
  askForJavascriptSyntax,
  writeExportsInIndexFile,
  chalkStyles,
};

#!/usr/bin/env node
const path = require("path");

const {
  checkPathExists,
  askForPermissionToProceed,
  askForLogicFolder,
  getAllSubfolders,
  createIndexFile,
  getFolderExports,
  askForJavascriptSyntax,
  writeExportsInIndexFile,
  chalkStyles,
} = require("./utils");

const main = async () => {
  const repoDirPath = path.resolve();

  const packageJsonFilePath = path.join(__dirname, "package.json");

  const isPackageJsonExists = await checkPathExists(packageJsonFilePath);

  if (!isPackageJsonExists) {
    const suggestionMessage = chalkStyles.advice(
      "Please run 'npm init' to create a package.json file before proceeding."
    );

    console.log(suggestionMessage);

    return;
  }

  const permission = await askForPermissionToProceed();

  if (!permission) {
    console.log(chalkStyles.error("Aborting..."));

    return;
  }

  const logicFolderPath = await askForLogicFolder(repoDirPath);

  const syntax = await askForJavascriptSyntax();

  // get all subfolders inside the logic folder
  const logicSubfoldersPathsArray = await getAllSubfolders(logicFolderPath, []);

  // console.log(logicSubfoldersPathsArray);

  // go to each subfolder and create index.js file if it's not present
  logicSubfoldersPathsArray.forEach(createIndexFile);

  // get all the exports form file in a particular folder
  const logicSubFoldersExportsObject = getFolderExports(
    logicSubfoldersPathsArray
  );

  writeExportsInIndexFile(logicSubFoldersExportsObject, syntax.toLowerCase());

  console.log(chalkStyles.success("All done!"));

  // const { bye } = require("./app/subdir");

  // console.log(bye());

  return;
};

main();

const path = require("path");
const chalkStyles = require("./chalkStyles");
const checkPathExists = require("./checkPathExists");

const askForLogicFolder = async (repoDirPath) => {
  const inquirer = await import("inquirer");

  const promptMessage = chalkStyles.prompt(
    "Enter the logic folder (e.g., current directory (.), app, src, etc.):"
  );

  const { folder } = await inquirer.default.prompt([
    {
      type: "input",
      name: "folder",
      message: promptMessage,
    },
  ]);

  const pathToCheck =
    folder !== "." ? path.join(repoDirPath, folder) : repoDirPath;

  if (!(await checkPathExists(pathToCheck))) {
    const errorMessage = chalkStyles.error(
      `The folder ${folder} does not exist or is not readable.`
    );

    console.log(errorMessage);
  }

  return pathToCheck;
};

module.exports = askForLogicFolder;

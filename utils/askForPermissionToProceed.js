const chalkStyles = require("./chalkStyles");

const askForPermissionToProceed = async () => {
  const inquirer = await import("inquirer");

  const promptMessage = chalkStyles.prompt(
    "Please confirm if you want to proceed. This will modify the index.js files."
  );

  const { confirm } = await inquirer.default.prompt([
    {
      name: "confirm",
      type: "confirm",
      message: promptMessage,
    },
  ]);

  return confirm;
};

module.exports = askForPermissionToProceed;

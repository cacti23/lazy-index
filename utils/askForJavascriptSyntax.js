const askForJavascriptSyntax = async () => {
  const inquirer = await import("inquirer");

  const { syntax } = await inquirer.default.prompt([
    {
      type: "list",
      name: "syntax",
      message: "Which syntax do you want to use?",
      choices: ["CommonJs", "ES6"],
    },
  ]);

  return syntax;
};

module.exports = askForJavascriptSyntax;

const chalk = require("chalk");

const chalkStyles = {
  error: chalk.bold.red,
  warning: chalk.keyword("orange").bold,
  prompt: chalk.cyan.bold,
  advice: chalk.yellow.italic,
  success: chalk.green,
  info: chalk.blue,
  debug: chalk.magenta,
  notice: chalk.bold.hex("#00FFFF"),
};

module.exports = chalkStyles;

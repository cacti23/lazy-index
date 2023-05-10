const fs = require("fs").promises;
const chalk = require("chalk");

const checkPathExists = async (path) => {
  try {
    await fs.access(path);

    return true;
  } catch (error) {
    return false;
  }
};

module.exports = checkPathExists;

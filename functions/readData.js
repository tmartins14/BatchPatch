const fs = require("fs");
const path = require("path");

function readData(relPath) {
  let orders;

  // Check if the requested file is in the root directory
  const isRootDirectory = relPath.startsWith("./");

  // Get the directory of the current module (the module that contains this helper)
  const currentModuleDir = isRootDirectory
    ? path.dirname(require.main.filename)
    : path.dirname(module.filename);

  // Construct the absolute path to the file using the current module's directory and the relative path
  const orderFilePath = path.join(currentModuleDir, relPath);

  try {
    const existingOrderData = fs.readFileSync(orderFilePath, "utf-8");
    orders = JSON.parse(existingOrderData);
  } catch (error) {
    console.error("Error reading existing order:", error.message);
  }

  return orders;
}

module.exports = readData;

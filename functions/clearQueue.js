const fs = require("fs");
const path = require("path");

const orderFilePath = path.join(__dirname, "../data/orders.json");

const clearQueue = () => {
  const queuedOrder = [];
  // Write the updated order back to the file
  try {
    fs.writeFileSync(
      orderFilePath,
      JSON.stringify(queuedOrder, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Error writing order to file:", error.message);
  }
};

module.exports = clearQueue;

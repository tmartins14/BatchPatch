const fs = require("fs");
const path = require("path");
const generateOrder = require("./generateOrder");
const genNormalRandomNumber = require("./genNormalRandomNumber");
const readData = require("./readData");
const orderFilePath = path.join(__dirname, "../data/orders.json");

const processDrinkOrder = (orderNumber, batchNumber, orderTimestamp) => {
  // console.log("Processing Order");

  const orderTime = orderTimestamp;
  let order = [];

  // const queuedOrder = readData("../data/orders.json");

  // console.log(queuedOrder);
  let queuedOrder; // Declare the variable outside the try block

  // Read existing order from the file, if it exists
  try {
    const existingOrderData = fs.readFileSync(orderFilePath, "utf-8");
    queuedOrder = JSON.parse(existingOrderData);
  } catch (error) {
    // Handle the case when the file doesn't exist or is invalid JSON
    console.error("Error reading existing order:", error.message);
    // Initialize queuedOrder as an empty array if the file doesn't exist
    queuedOrder = [];
  }

  // Assume everyone at a table gets a drink
  const tableSize = genNormalRandomNumber(5, 1.5);

  // Set Table Number Randomly -> Assuming there are 14 total tables
  const tableNumber = Math.floor(Math.random() * 14);

  // Take everyone's order
  for (let i = 0; i < tableSize; i++) {
    const individualOrder = generateOrder();
    individualOrder.tableNumber = tableNumber;
    individualOrder.quantity = 1;
    individualOrder.orderTime = orderTime;
    individualOrder.orderNumber = orderNumber;
    individualOrder.batchNumber = batchNumber;

    order.push(individualOrder);
  }

  queuedOrder.push(order);

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

module.exports = processDrinkOrder;

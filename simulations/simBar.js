// Simulate a bar where the bartenders use either the Batch Process
// or Non-Batch Process

// Batch Process: all drink orders are batched together for a batching time.
// Bartender then multiple of the same drinks and completes multiple orders at the
// same time.

// Non-Batch Process: start a drink order immediately after the order
// is placed and cannot start the next order until all drinks from the
// current order are completed (i.e. Non-Batch Process)

// The aim will be to time how long it would take the inputted number of bartenders
// to complete all the drinks.

const clearQueue = require("../functions/clearQueue");
const simProcessDrinkOrder = require("./simProcessDrinkOrder.js");
const simFulfillDrinkOrders = require("./simFulfillDrinkOrder");
const readData = require("../functions/readData");

// Process Drink Inputs:
// Define Bar Open and Close Time, and avg time between orders
const startTime = new Date("2023-12-15T17:00:00"); // December 15, 2023, 5:00:00 PM
const endTime = new Date("2023-12-16T02:00:00"); // December 16, 2023, 2:00:00 AM
const avgTimeBetweenOrders = 1;
const orderBatchPeriod = 4;

// Generate Order List for both groups to fulfill
simProcessDrinkOrder(
  avgTimeBetweenOrders,
  orderBatchPeriod,
  startTime,
  endTime
);

const orders = readData("../data/orders.json");

// Fulfillment Inputs
// Number of Bartenders
const numBartenders = 3;

// Loop through each order, assign to a bartender for them to fulfill
// const nonBatchResult = nonBatchSim(numBartenders, orders);
const nonBatchResult = simFulfillDrinkOrders(numBartenders, orders, false);

console.log("Total Drinks Made:", nonBatchResult.totalDrinksMade);
console.log(
  "Total Time To Complete All Orders with the Chit Process:",
  nonBatchResult.totalTimeToComplete,
  "minutes"
);

const batchResult = simFulfillDrinkOrders(numBartenders, orders, true);

console.log("Total Drinks Made:", batchResult.totalDrinksMade);
console.log(
  "Total Time To Complete All Orders with the Batch Process:",
  batchResult.totalTimeToComplete,
  "minutes"
);

// Loop through each batch, assign to a bartender for them to fulfill
// const batchSim = () => {
//   //
// };

clearQueue();

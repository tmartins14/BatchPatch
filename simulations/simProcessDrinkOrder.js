const genNormalRandomNumber = require("../functions/genNormalRandomNumber");
const processDrinkOrder = require("../functions/processDrinkOrder");

const simProcessDrinkOrder = (
  avgTimeBetweenOrders,
  orderBatchPeriod,
  startTime,
  endTime
) => {
  //
  let orderNumber = 1;
  let batchNumber = 1;

  let orderTimestamp = startTime;
  let orderBatchStart = startTime;
  let orderBatchEnd = new Date(
    orderBatchStart.getTime() + orderBatchPeriod * 60000
  ); // milliseconds

  while (orderTimestamp < endTime) {
    // Start new batch if orderTimestamp is past batch end time
    if (orderTimestamp > orderBatchEnd) {
      batchNumber++;
      orderBatchEnd.setMinutes(orderBatchEnd.getMinutes() + orderBatchPeriod);
    }

    processDrinkOrder(orderNumber, batchNumber, orderTimestamp);

    // Update next order time and number
    const timeToNextOrder = genNormalRandomNumber(avgTimeBetweenOrders, 1) * 60;
    orderTimestamp.setSeconds(orderTimestamp.getSeconds() + timeToNextOrder);
    orderNumber++;
  }
};

const startTime = new Date("2023-12-15T17:00:00"); // December 15, 2023, 5:00:00 PM
const endTime = new Date("2023-12-15T18:00:00"); // December 16, 2023, 2:00:00 AM
const avgTimeBetweenOrders = 1;
const orderBatchPeriod = 4;

// Generate Order List for both groups to fulfill
// simProcessDrinkOrder(
//   avgTimeBetweenOrders,
//   orderBatchPeriod,
//   startTime,
//   endTime
// );

module.exports = simProcessDrinkOrder;

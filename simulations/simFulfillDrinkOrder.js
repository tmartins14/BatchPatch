const assignBartenders = require("../functions/assignBartenders.js");
const groupDrinkOrders = require("../functions/groupDrinkOrders.js");

const simFulfillDrinkOrders = (bartenderCount, orders, batchOrders) => {
  // Create bartender object where each key represents a boolean value -> true = fulfilling an order, false = not fulfilling and order
  let bartenders = {};
  for (let i = 1; i <= bartenderCount; i++) {
    bartenders[i.toString()] = false;
  }

  let groupedDrinkOrder;
  if (batchOrders) {
    const [batchedQuantityPerDrink, batchedTableOrders] = groupDrinkOrders(
      orders,
      true
    );
    groupedDrinkOrder = batchedQuantityPerDrink;
  } else {
    const [chitQuantityPerDrink, chitTableOrders] = groupDrinkOrders(
      orders,
      false
    );
    groupedDrinkOrder = chitQuantityPerDrink;
  }

  //   Calculate total number of drinks and time to complete for each order
  const groupedOrders = {};

  for (let order in groupedDrinkOrder) {
    let totalAmount = 0;
    let totalTimeToMake = 0;
    const orderTime = groupedDrinkOrder[order].orderTime;

    for (let drink in groupedDrinkOrder[order].drinks) {
      totalAmount += groupedDrinkOrder[order].drinks[drink].amount;
      totalTimeToMake += groupedDrinkOrder[order].drinks[drink].timeToMake;
    }

    groupedOrders[order] = {
      orderTime: orderTime,
      amount: totalAmount,
      timeToMake: totalTimeToMake,
    };
  }

  //   console.log(groupedOrders);

  // Assign bartender to "complete" orders

  // console.log(bartenders);
  //   console.log(groupedOrders);

  result = assignBartenders(bartenders, groupedOrders);

  //   console.log(`Total time for all orders: ${totalTimeToMake} minutes`);
  //   console.log(`Total number of drinks made: ${totalAmount} drinks`);

  return result;
};

module.exports = simFulfillDrinkOrders;

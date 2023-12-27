const simProcessDrinkOrder = require("./simulations/simProcessDrinkOrder");
const groupDrinkOrders = require("./functions/groupDrinkOrders");
const clearQueue = require("./functions/clearQueue");
const readData = require("./functions/readData");
const countTotalOrders = require("./functions/countTotalOrders");

// Define Bar Open and Close Time, and avg time between orders
const startTime = new Date("2023-12-15T17:00:00"); // December 15, 2023, 5:00:00 PM
const endTime = new Date("2023-12-15T17:20:00"); // December 16, 2023, 2:00:00 AM
const avgTimeBetweenOrders = 1;
const orderBatchPeriod = 2;

// Generate Order List for both groups to fulfill
simProcessDrinkOrder(
  avgTimeBetweenOrders,
  orderBatchPeriod,
  startTime,
  endTime
);

const orders = readData("./data/orders.json");

countTotalOrders(orders);

const [batchedQuantityPerDrink, batchedTableOrders] = groupDrinkOrders(
  orders,
  true
);

// console.log("Batched Orders: ", batchedQuantityPerDrink);

const [chitQuantityPerDrink, chitTableOrders] = groupDrinkOrders(orders, false);
// console.log("Chit Orders: ", chitQuantityPerDrink);

// Initialize the total number of drinks and total time to make

const orderGroups = [batchedQuantityPerDrink, chitQuantityPerDrink];

for (let orders of orderGroups) {
  let totalDrinks = 0;
  let totalTimeToMake = 0;
  // Iterate through each order
  for (const orderKey in orders) {
    if (Object.hasOwnProperty.call(orders, orderKey)) {
      const order = orders[orderKey];

      // Check if the order has a 'drinks' property
      if (order.hasOwnProperty("drinks")) {
        const drinksObject = order.drinks;

        // Iterate through each drink in the order
        for (const drinkKey in drinksObject) {
          if (Object.hasOwnProperty.call(drinksObject, drinkKey)) {
            const drink = drinksObject[drinkKey];
            // Sum up the 'amount' and 'timeToMake' values
            totalDrinks += drink.amount;
            totalTimeToMake += drink.timeToMake;
          }
        }
      }
    }
  }

  console.log("Total number of drinks:", totalDrinks);
  console.log("Total time to make:", totalTimeToMake);
}
// clearQueue();

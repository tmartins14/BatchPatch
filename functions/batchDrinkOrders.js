const buildDrinkMap = require("./buildDrinkMap");

const batchDrinkOrders = (queuedOrder) => {
  const batchedQuantityPerDrink = {};
  let batchedTableOrders = {};

  queuedOrder.forEach((order) => {
    order.forEach((drink) => {
      const drinkName = drink.drinkName;
      const tableNumber = drink.tableNumber;
      const orderTime = drink.orderTime;
      const timeToMake = drink.timeToMake;
      const batchNumber = drink.batchNumber;

      // Calculate total quantity per batch and per drink
      buildDrinkMap(
        batchedQuantityPerDrink,
        orderTime,
        drinkName,
        timeToMake,
        batchNumber,
        batchedTableOrders,
        tableNumber
      );
    });
  });

  //   Sort tableOrders by orderTime
  // Convert tableOrders into an array of key-value pairs
  const ordersArray = Object.entries(batchedTableOrders);

  //   Sort the array based on the orderTime property
  ordersArray.sort((a, b) => a[1].orderTime - b[1].orderTime);

  // Contruct a new object from the sorted array
  batchedTableOrders = Object.fromEntries(ordersArray);

  return { batchedQuantityPerDrink, batchedTableOrders };
};

module.exports = batchDrinkOrders;

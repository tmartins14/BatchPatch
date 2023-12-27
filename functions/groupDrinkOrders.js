const buildDrinkMap = require("./buildDrinkMap");

const groupDrinkOrder = (queuedOrder, batch) => {
  const totalQuantityPerDrink = {};
  let tableOrders = {};

  queuedOrder.forEach((order) => {
    order.forEach((drink) => {
      const drinkName = drink.drinkName;
      const tableNumber = drink.tableNumber;
      const orderTime = drink.orderTime;
      const timeToMake = drink.timeToMake;
      const groupNumber = batch ? drink.batchNumber : drink.orderNumber;

      // Calculate total quantity per batch and per drink
      buildDrinkMap(
        totalQuantityPerDrink,
        orderTime,
        drinkName,
        timeToMake,
        groupNumber,
        tableOrders,
        tableNumber
      );
    });
  });

  //   Sort tableOrders by orderTime
  // Convert tableOrders into an array of key-value pairs
  const ordersArray = Object.entries(tableOrders);

  //   Sort the array based on the orderTime property
  ordersArray.sort((a, b) => a[1].orderTime - b[1].orderTime);

  // Contruct a new object from the sorted array
  tableOrders = Object.fromEntries(ordersArray);

  return [totalQuantityPerDrink, tableOrders];
};

module.exports = groupDrinkOrder;

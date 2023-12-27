const buildDrinkMap = require("./buildDrinkMap");

const chitDrinkOrders = (queuedOrder) => {
  const chitQuantityPerDrink = {};
  let chitTableOrders = {};

  queuedOrder.forEach((order) => {
    order.forEach((drink) => {
      const drinkName = drink.drinkName;
      const tableNumber = drink.tableNumber;
      const orderTime = drink.orderTime;
      const timeToMake = drink.timeToMake;
      const orderNumber = drink.orderNumber;

      // Calculate total quantity per batch and per drink
      buildDrinkMap(
        chitQuantityPerDrink,
        orderTime,
        drinkName,
        timeToMake,
        orderNumber,
        chitTableOrders,
        tableNumber
      );
    });
  });

  //   Sort tableOrders by orderTime
  // Convert tableOrders into an array of key-value pairs
  const ordersArray = Object.entries(chitTableOrders);

  //   Sort the array based on the orderTime property
  ordersArray.sort((a, b) => a[1].orderTime - b[1].orderTime);

  // Contruct a new object from the sorted array
  chitTableOrders = Object.fromEntries(ordersArray);

  return { chitQuantityPerDrink, chitTableOrders };
};

module.exports = chitDrinkOrders;

function assignBartenders(bartenders, orders) {
  const completedOrders = {};
  let totalDrinksMade = 0;
  let earliestOrderTime = Infinity;
  let latestCompletionTime = 0;

  // Sort the orders based on their order time
  const sortedOrders = Object.entries(orders).sort(
    (a, b) => new Date(a[1].orderTime) - new Date(b[1].orderTime)
  );

  // console.log(sortedOrders);

  for (const [orderNumber, order] of sortedOrders) {
    // Find the available bartender with the earliest completion time
    const availableBartender = Object.entries(bartenders).sort(
      (a, b) =>
        new Date(a[1].completionTime || 0) - new Date(b[1].completionTime || 0)
    )[0];

    if (availableBartender) {
      const [bartenderNumber, { completionTime }] = availableBartender;

      // Calculate the completion time for the current order
      const orderCompletionTime =
        Math.max(new Date(order.orderTime).getTime(), completionTime || 0) +
        order.timeToMake * 60000;

      // Update the completion time for the assigned bartender
      bartenders[bartenderNumber].completionTime = orderCompletionTime;

      // Update the earliest order time
      earliestOrderTime = Math.min(
        earliestOrderTime,
        new Date(order.orderTime).getTime()
      );

      // Update the latest completion time
      latestCompletionTime = Math.max(
        latestCompletionTime,
        orderCompletionTime
      );

      // console.log(orderCompletionTime);

      // Assign the order to the bartender
      completedOrders[orderNumber] = {
        ...order,
        bartender: bartenderNumber,
        orderCompleteTime: new Date(orderCompletionTime).toISOString(),
      };

      // Update the total number of drinks made
      totalDrinksMade += order.amount;
    } else {
      // If no available bartender, mark the order accordingly
      completedOrders[orderNumber] = {
        ...order,
        bartender: "No available bartender",
        orderCompleteTime: null,
      };
    }
  }

  // Calculate total time to complete all orders in minutes
  const totalTimeToComplete =
    (latestCompletionTime - earliestOrderTime) / 60000;

  return { completedOrders, totalDrinksMade, totalTimeToComplete };
}

// // Initialize bartenders with their state, including completion time
// const bartenders = {
//   1: { completionTime: null },
//   2: { completionTime: null },
//   3: { completionTime: null },
//   4: { completionTime: null },
//   5: { completionTime: null },
// };

// // Sample orders with order time, amount, and time to make
// const orders = {
//   1: { orderTime: "2023-12-15T22:00:00.000Z", amount: 7, timeToMake: 29 },
//   2: { orderTime: "2023-12-15T22:01:19.000Z", amount: 8, timeToMake: 20 },
//   3: { orderTime: "2023-12-15T22:02:19.000Z", amount: 9, timeToMake: 28 },
//   4: { orderTime: "2023-12-15T22:03:49.000Z", amount: 6, timeToMake: 20 },
//   5: { orderTime: "2023-12-15T22:04:49.000Z", amount: 7, timeToMake: 23 },
//   6: { orderTime: "2023-12-15T22:06:21.000Z", amount: 5, timeToMake: 16 },
//   7: { orderTime: "2023-12-15T22:07:21.000Z", amount: 5, timeToMake: 20 },
//   8: { orderTime: "2023-12-15T22:08:21.000Z", amount: 6, timeToMake: 25 },
//   9: { orderTime: "2023-12-15T22:09:21.000Z", amount: 7, timeToMake: 20 },
//   10: { orderTime: "2023-12-15T22:11:01.000Z", amount: 7, timeToMake: 22 },
//   11: { orderTime: "2023-12-15T22:13:08.000Z", amount: 7, timeToMake: 19 },
//   12: { orderTime: "2023-12-15T22:14:08.000Z", amount: 7, timeToMake: 24 },
//   13: { orderTime: "2023-12-15T22:15:08.000Z", amount: 4, timeToMake: 19 },
//   14: { orderTime: "2023-12-15T22:16:54.000Z", amount: 6, timeToMake: 17 },
//   15: { orderTime: "2023-12-15T22:18:57.000Z", amount: 4, timeToMake: 19 },
//   16: { orderTime: "2023-12-15T22:19:57.000Z", amount: 6, timeToMake: 20 },
// };

// // Call the function and display the result
// const result = assignBartenders(bartenders, orders);
// console.log("Completed Orders:", result.completedOrders);
// console.log("Total Drinks Made:", result.totalDrinksMade);
// console.log(
//   "Total Time To Complete All Orders:",
//   result.totalTimeToComplete,
//   "minutes"
// );
// console.log("Orders with Completion Time:", result.completedOrders);

module.exports = assignBartenders;

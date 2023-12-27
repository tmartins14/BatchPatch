function countTotalOrders(orders) {
  // Initialize a variable to store the total count
  let totalDrinkObjects = 0;

  // Iterate through each inner array
  orders.forEach((innerArray) => {
    // For each inner array, add the length to the total count
    totalDrinkObjects += innerArray.length;
  });

  console.log("Total number of drink objects:", totalDrinkObjects);
}

module.exports = countTotalOrders;

const buildDrinkMap = (
  drinkMap,
  orderTime,
  drinkName,
  timeToMake,
  groupNumber,
  tableDrinks,
  tableNumber
) => {
  // Calculate total quantity per batch and per drink
  if (!drinkMap[groupNumber]) {
    drinkMap[groupNumber] = {
      orderTime,
      drinks: {},
    };
  }

  if (!drinkMap[groupNumber].drinks[drinkName]) {
    drinkMap[groupNumber].drinks[drinkName] = {
      amount: 1,
      timeToMake,
    };
  } else {
    drinkMap[groupNumber].drinks[drinkName].amount++;
  }

  // Calculate total quantity per drink for each table
  if (!tableDrinks[tableNumber]) {
    tableDrinks[tableNumber] = {
      drinks: {},
      orderTime,
      groupNumber,
    };
  }
  if (!tableDrinks[tableNumber].drinks[drinkName]) {
    tableDrinks[tableNumber].drinks[drinkName] = 1;
  } else {
    tableDrinks[tableNumber].drinks[drinkName]++;
  }

  //   return drinkMap;
};

module.exports = buildDrinkMap;

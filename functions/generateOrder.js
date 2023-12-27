const cocktailData = require("../data/drinks.json");

function generateOrder() {
  const randomIndex = Math.floor(Math.random() * cocktailData.length);
  return cocktailData[randomIndex];
}

module.exports = generateOrder;

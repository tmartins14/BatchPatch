const genNormalRandomNumber = (mean, stdDev) => {
  let u1, u2;
  do {
    u1 = Math.random();
    u2 = Math.random();
  } while (u1 <= Number.EPSILON); // Ensure u1 is not too close to 0

  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  const randomNumber = mean + stdDev * z0;

  // Ensure the generated number is within the desired range
  return Math.max(1, Math.min(10, randomNumber));
};

module.exports = genNormalRandomNumber;

// Function to generate a random timestamp between two times
function getRandomTimestamp(startTime, endTime) {
  // Calculate the time difference in milliseconds
  const timeDifference = endTime.getTime() - startTime.getTime();

  // Generate a random time within the time difference
  const randomTime = startTime.getTime() + Math.random() * timeDifference;

  // Create a new Date object with the random timestamp
  const randomTimestamp = new Date(randomTime);

  return randomTimestamp;
}

module.exports = getRandomTimestamp;

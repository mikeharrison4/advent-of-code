const fs = require("fs");
const operators = ["+", "*", "|"];

function checkCombinationsForTarget(numbers, target) {
  let operatorCombinations = operators.map((op) => [op]); // Start with each operator as its own array
  for (let i = 1; i < numbers.length - 1; i++) {
    operatorCombinations = operatorCombinations.flatMap((combination) =>
      operators.map((op) => [...combination, op])
    );
  }

  for (let combination of operatorCombinations) {
    // Evaluate the result for this operator combination
    let result = numbers[0]; // Start with the first number
    for (let i = 0; i < combination.length; i++) {
      if (combination[i] === "+") {
        result += numbers[i + 1];
      } else if (combination[i] === "*") {
        result *= numbers[i + 1];
      } else if (combination[i] === "|") {
        result = Number(result + "" + numbers[i + 1]);
      }
      console.log(combination[i], numbers[i], result);
    }

    console.log(combination, result);

    if (result === target) {
      return true;
    }
  }

  return false;
}

fs.readFile("example-input.txt", "utf-8", (err, data) => {
  const list = data
    .split("\n")
    .map((row) => row.replace(":", ""))
    .map((row) => row.split(" ").map(Number));

  let result = 0;
  list.forEach((row) => {
    const target = row[0];
    const numbers = row.slice(1);
    if (checkCombinationsForTarget(numbers, target)) {
      // console.log(target, numbers)
      result += target;
    }
  });

  console.log(result);
});

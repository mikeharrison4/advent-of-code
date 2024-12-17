import { readFile } from "../readFile";

// const puzzleInput = readFile('./input.txt').trim().split("\n");
const puzzleInput = readFile('./input.txt').trim().split("\n");

function isOperatorTrue(targetNum: number, numValues: number[]) {
  if (numValues.length === 1) {
    return targetNum === numValues[0]
  }

  if (targetNum % numValues[numValues.length - 1] === 0 && isOperatorTrue(targetNum / numValues[numValues.length - 1], numValues.slice(0, -1))) return true;

  if (targetNum > numValues[numValues.length - 1] && isOperatorTrue(targetNum - numValues[numValues.length - 1], numValues.slice(0, -1))) return true;

  if ((targetNum - numValues[numValues.length - 1]) % 10 === 0 && isOperatorTrue(Math.floor(targetNum / Math.pow(10, numValues[numValues.length - 1].toString().length)), numValues.slice(0, -1))) return true;

  return false;
}

const result = puzzleInput.reduce((acc, curr) => {
  const [target, values] = curr.split(": ");
  const targetNum = Number(target);
  const numValues = values.split(" ").map(Number);

  if (isOperatorTrue(targetNum, numValues)) {
    return acc + targetNum;
  }

  return acc;
}, 0)

console.log(result)

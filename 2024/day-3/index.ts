import { readFile } from "../readFile";

const puzzleInput = readFile('./input.txt');

function getMatches(regex: RegExp) {
  return puzzleInput.match(regex);
}

function getResult(matches: RegExpMatchArray[]) {
  return matches.reduce((acc, currentValue) => {
    if (!currentValue) return acc;
    const [firstNumber, secondNumber] = currentValue;

    return acc + Number(firstNumber) * Number(secondNumber);
  }, 0)
}

const matchesPart1 = getMatches(/mul\(\d+,\d+\)/g).map(matchedStr => matchedStr.match(/\d+/g))
let enabled = true;
const matchesPart2 = getMatches(/mul\(\d+,\d+\)|don't\(\)|do\(\)/g).map(matchedStr => {
  if (matchedStr === "don't()") enabled = false;
  if (matchedStr === "do()") enabled = true;
  if (enabled) return matchedStr.match(/\d+/g)
});

console.log(getResult(matchesPart1));
console.log(getResult(matchesPart2));

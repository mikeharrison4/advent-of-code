import { readFile } from "../readFile";

const puzzleInput = readFile('./input.txt');

const wordSearch = puzzleInput.trim().split('\n');


// We already know the first char is 'X'
function isXmas(secondChar: string, thirdChar: string, fourthChar: string) {
  return secondChar === 'M' && thirdChar === 'A' && fourthChar === 'S';
}

function getPart1Answer() {
  let part1Count = 0;

  for (let rowIndex = 0; rowIndex < wordSearch.length; rowIndex++) {
    const row = wordSearch[rowIndex];

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      if (row[colIndex] !== 'X') continue;

      for (let rowDirection = -1; rowDirection <= 1; rowDirection++) {
        for (let colDirection = -1; colDirection <= 1; colDirection++) {
          if (colDirection === 0 && rowDirection === 0) continue;

          const isOutOfBounds = rowIndex + 3 * rowDirection < 0 || rowIndex + 3 * rowDirection >= wordSearch.length || colIndex + 3 * colDirection < 0;

          if (isOutOfBounds) continue;

          const firstLetter = wordSearch[rowIndex + rowDirection][colIndex + colDirection];
          const secondLetter = wordSearch[rowIndex + (2 * rowDirection)][colIndex + (2 * colDirection)];
          const thirdLetter = wordSearch[rowIndex + (3 * rowDirection)][colIndex + (3 * colDirection)];

          if (isXmas(firstLetter, secondLetter, thirdLetter)) {
            part1Count++;
          }
        }
      }
    }
  }

  return part1Count;
}

function getPart2Answer() {
  let part2Count = 0;

  for (let rowIndex = 0; rowIndex < wordSearch.length; rowIndex++) {
    const row = wordSearch[rowIndex];

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      if (row[colIndex] !== 'A') continue;

      const isOutOfBounds = rowIndex === 0 || rowIndex === wordSearch.length - 1 || colIndex === 0 || colIndex === row.length - 1;
      if (isOutOfBounds) continue;

      const directions = [-1, 1];
      const winningCombos = { 'MMSS': true, 'SSMM': true, 'MSMS': true, 'SMSM': true }
      let combo = ''

      for (let i = 0; i < directions.length; i++) {
        combo += `${wordSearch[rowIndex - 1][colIndex + directions[i]]}${wordSearch[rowIndex + 1][colIndex + directions[i]]}`
      }

      if (winningCombos[combo]) part2Count++;
    }
  }

  return part2Count;
}

console.log(getPart1Answer());
console.log(getPart2Answer());

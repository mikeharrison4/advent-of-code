import { readFile } from "../readFile";

const puzzleInput = readFile('./input.txt').trim().split("\n");

function isOutOfBounds(row: number, col: number) {
  return row < 0 || row >= puzzleInput.length || col < 0 || col >= puzzleInput[0].length;
}

function applyAntiNodesPart1(frequencyPositions: Array<number[]>, uniqueAntiNodePositions: Set<string>) {
  for (let i = 0; i < frequencyPositions.length; i++) {
    for (let j = i + 1; j < frequencyPositions.length; j++) {
      const frequencyOne = frequencyPositions[i];
      const frequencyTwo = frequencyPositions[j];
      const rowDiff = frequencyTwo[0] - frequencyOne[0];
      const colDiff = frequencyTwo[1] - frequencyOne[1];

      if (!isOutOfBounds(frequencyOne[0] - rowDiff, frequencyOne[1] - colDiff)) {
        uniqueAntiNodePositions.add(`${frequencyOne[0] - rowDiff}, ${frequencyOne[1] - colDiff}`);
      }

      if (!isOutOfBounds(frequencyTwo[0] + rowDiff, frequencyTwo[1] + colDiff)) {
        uniqueAntiNodePositions.add(`${frequencyTwo[0] + rowDiff}, ${frequencyTwo[1] + colDiff}`);
      }
    }
  }
}

function part1GetUniqueAntiNodePositions() {
  const frequencies: Record<string, Array<number[]>> = {}
  const uniqueAntiNodePositions = new Set<string>();

  for (let row = 0; row < puzzleInput.length; row++) {
    for (let col = 0; col < puzzleInput[row].length; col++) {
      const item = puzzleInput[row][col];

      if (item !== '.') {
        if (frequencies[item]) {
          frequencies[item] = [...frequencies[item], [row, col]];
          applyAntiNodesPart1(frequencies[item], uniqueAntiNodePositions)
        } else {
          frequencies[item] = [[row, col]];
        }
      }

    }
  }

  return uniqueAntiNodePositions.size;
}

function applyAntiNodesPart2(frequencyPositions: Array<number[]>, uniqueAntiNodePositions: Set<string>) {
  for (let i = 0; i < frequencyPositions.length; i++) {
    for (let j = i + 1; j < frequencyPositions.length; j++) {
      let frequencyOne = frequencyPositions[i];
      let frequencyTwo = frequencyPositions[j];

      const constantRowDiff = frequencyTwo[0] - frequencyOne[0];
      const constantColDiff = frequencyTwo[1] - frequencyOne[1];

      uniqueAntiNodePositions.add(`${frequencyOne[0]}, ${frequencyOne[1]}`)

      for (const direction of [-1, 1]) {
        let rowDiff = constantRowDiff;
        let colDiff = constantColDiff;

        while (true) {
          if (isOutOfBounds(frequencyOne[0] + (rowDiff * direction), frequencyOne[1] + (colDiff * direction))) break;
          uniqueAntiNodePositions.add(`${frequencyOne[0] + (rowDiff * direction)}, ${frequencyOne[1] + (colDiff * direction)}`);

          rowDiff += constantRowDiff;
          colDiff += constantColDiff;
        }
      }
    }
  }
}

function part2GetUniqueAntiNodePositions() {
  const frequencies: Record<string, Array<number[]>> = {}
  const uniqueAntiNodePositions = new Set<string>();

  for (let row = 0; row < puzzleInput.length; row++) {
    for (let col = 0; col < puzzleInput[row].length; col++) {
      const item = puzzleInput[row][col];

      if (item !== '.') {
        if (frequencies[item]) {
          frequencies[item] = [...frequencies[item], [row, col]];
          applyAntiNodesPart2(frequencies[item], uniqueAntiNodePositions)
        } else {
          frequencies[item] = [[row, col]];
        }
      }
    }
  }

  return uniqueAntiNodePositions.size;
}

console.log(part1GetUniqueAntiNodePositions());
console.log(part2GetUniqueAntiNodePositions());

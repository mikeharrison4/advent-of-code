import { readFile } from "../readFile";

const puzzleInput = readFile('./input.txt').trim();

function produceIndividualBlocks() {
  const individualBlocks: Array<Array<string | number>> = [];
  let isBlockFile = true;
  let id = 0;

  for (let index = 0; index < puzzleInput.length; index++) {
    const block: (string|number)[] = new Array(Number(puzzleInput[index]));

    if (isBlockFile) {
      block.fill(id);
      id++;
    } else {
      block.fill('.');
    }

    individualBlocks.push(block);
    isBlockFile = !isBlockFile;
  }

  return individualBlocks;
}


function moveFileBlocks() {
  const individualBlocks = produceIndividualBlocks();
  let leftPointer = 0;
  let rightPointer = individualBlocks.length - 1;

  while (rightPointer !== 0) {
    if (leftPointer >= rightPointer) {
      rightPointer--;
      leftPointer = 0;
      continue;
    }
    if (individualBlocks[leftPointer][0] !== '.') {
      leftPointer++;
      continue;
    }
    if (individualBlocks[rightPointer][0] === '.') {
      rightPointer--;
      continue;
    }

    const diff = individualBlocks[leftPointer].length - individualBlocks[rightPointer].length;

    if (diff >= 0) {
      individualBlocks[leftPointer] = individualBlocks[rightPointer];
      individualBlocks.splice(rightPointer, 1, new Array(individualBlocks[rightPointer].length).fill('.'));
      if (diff > 0) {
        individualBlocks.splice(leftPointer + 1, 0, new Array(diff).fill('.'));
      }
      leftPointer = 0;
    } else {
      leftPointer++;
    }
  }

  return individualBlocks;
}

const part1Result =
  moveFileBlocks().flat()
    .reduce((acc: number, currentValue: number, currentIndex) => {
      if (!Number(currentValue)) return acc;
      return acc + (currentIndex * currentValue);
    }, 0);

console.log(part1Result);

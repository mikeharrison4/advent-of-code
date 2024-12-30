import { readFile } from "../readFile";

const puzzleInput = readFile('./example-input.txt').trim();

function produceIndividualBlocks() {
  const individualBlocks: Array<string | number> = [];
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

    individualBlocks.push(...block);
    isBlockFile = !isBlockFile;
  }

  return individualBlocks;
}


function moveFileBlocks() {
  const individualBlocks = produceIndividualBlocks();
  let leftPointer = 0;
  let rightPointer = individualBlocks.length - 1;

  while (leftPointer !== rightPointer) {
    if (individualBlocks[leftPointer] !== '.') {
      leftPointer++;
    } else {
      individualBlocks[leftPointer] = individualBlocks.pop()
      rightPointer--;
    }
  }

  return individualBlocks;
}

const part1Result =
  moveFileBlocks()
    .reduce((acc: number, currentValue: number, currentIndex) => {
      if (!Number(currentValue)) return acc;
      return acc + (currentIndex * currentValue);
    }, 0);

console.log(part1Result);

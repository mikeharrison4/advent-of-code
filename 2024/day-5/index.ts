import { readFile } from "../readFile";

const puzzleInput = readFile('./input.txt').split('\n');

const pageOrderingRules = puzzleInput.filter(item => item.includes('|')).reduce((acc, curr) => ({
  ...acc,
  [curr]: true,
}), {});
const pageUpdates = puzzleInput.filter(item => item.includes(','));

let countPart1 = 0;
let countPart2 = 0;

function reorderIncorrectPageUpdates(pageUpdates: Array<string>) {
  for (let index = 0; index < pageUpdates.length; index++) {
    if(index === pageUpdates.length - 1) break;

    const pageNumber = pageUpdates[index];
    const nextPageNumber = pageUpdates[index + 1];

    if (!pageOrderingRules[`${pageNumber}|${nextPageNumber}`]) {
      pageUpdates[index] = nextPageNumber;
      pageUpdates[index + 1] = pageNumber;
      index -= index + 1;
    }
  }

  return pageUpdates;
}

for (let index = 0; index < pageUpdates.length; index++) {
  const splitPageUpdates = pageUpdates[index].split(',');

  const isPageUpdatesCorrectOrder = splitPageUpdates.every((item, index, arr) => {
    if (index === 0) return true;
    return pageOrderingRules[`${arr[index - 1]}|${item}`];
  })

  if (isPageUpdatesCorrectOrder) {
    countPart1 += Number(splitPageUpdates[Math.floor(splitPageUpdates.length / 2)]);
  } else {
    const correctlyOrderedPageUpdates = reorderIncorrectPageUpdates(splitPageUpdates);
    countPart2 += Number(correctlyOrderedPageUpdates[Math.floor(splitPageUpdates.length / 2)]);
  }
}

console.log(countPart1)
console.log(countPart2)

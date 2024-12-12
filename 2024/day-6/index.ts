import { readFile } from "../readFile";

const puzzleInput = readFile('./input.txt')

let mapInput = puzzleInput.split('\n');

function getGuardStartPosition(): number[] {
  for (let row = 0; row < mapInput.length; row++) {
    for (let col = 0; col < mapInput[row].length; col++) {
      if (mapInput[row][col] === '^') {
        return [row, col];
      }
    }
  }
}

function moveGuardPosition(guardPosition: number[], positionsCovered: Map<string, number[]>) {
  let directionIndex = 0;
  const testDirections = [[-1, 0], [0, 1], [1, 0], [0, -1]];

  while (true) {
    const nextPosition= [guardPosition[0] + testDirections[directionIndex][0], guardPosition[1] + testDirections[directionIndex][1]]

    const hasGuardLeftTheArea = mapInput[nextPosition[0]][nextPosition[1]] === undefined;
    if (hasGuardLeftTheArea) {
      break;
    }

    if (mapInput[nextPosition[0]][nextPosition[1]] === '#') {
      directionIndex = directionIndex === testDirections.length - 1 ? 0 : directionIndex + 1;
      continue;
    }

    positionsCovered.set(nextPosition.toString(), nextPosition);
    guardPosition = nextPosition;
  }
}

function getPatrolPathUniquePositions() {
  const positionsCovered = new Map<string, number[]>();
  let guardPosition = getGuardStartPosition();
  positionsCovered.set(guardPosition.toString(), guardPosition)

  moveGuardPosition(guardPosition, positionsCovered);

  return positionsCovered.size;
}

console.log(getPatrolPathUniquePositions());



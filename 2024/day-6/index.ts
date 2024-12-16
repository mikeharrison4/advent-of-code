import { readFile } from "../readFile";

const puzzleInput = readFile('./input.txt')

const mapInput = puzzleInput.split('\n');

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
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let directionIndex = 0;

  while (true) {
    const nextPosition= [guardPosition[0] + directions[directionIndex][0], guardPosition[1] + directions[directionIndex][1]]

    const hasGuardLeftTheArea = mapInput[nextPosition[0]][nextPosition[1]] === undefined;
    if (hasGuardLeftTheArea) {
      break;
    }

    if (mapInput[nextPosition[0]][nextPosition[1]] === '#') {
      directionIndex = directionIndex === directions.length - 1 ? 0 : directionIndex + 1;
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

  return positionsCovered;
}

// PART 2

function isGuardStuckInLoop(map: Array<string>, guardPosition: number[], obstaclePosition: number[]) {
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let directionIndex = 0;
  const cache = new Map<string, boolean>();

  while (true) {
    cache.set(`${guardPosition[0]},${guardPosition[1]},${directionIndex}`, true);

    const nextPosition= [guardPosition[0] + directions[directionIndex][0], guardPosition[1] + directions[directionIndex][1]]

    const hasGuardLeftTheArea = nextPosition[0] >= map.length || nextPosition[0] < 0 || nextPosition[1] >= map[0].length || nextPosition[1] < 0;
    if (hasGuardLeftTheArea) {
      return false;
    }

    if (map[nextPosition[0]][nextPosition[1]] === '#') {
      directionIndex = directionIndex === directions.length - 1 ? 0 : directionIndex + 1;
      continue;
    }

    if (cache.has(`${nextPosition[0]},${nextPosition[1]},${directionIndex}`)) {
      return true;
    }

    guardPosition = nextPosition;
  }
}

function setObstacle(position: number[]) {
  const mapWithObstacle = [...mapInput];
  const row = [...mapInput[position[0]].split('')];

  row[position[1]] = row[position[1]] !== '^' ? '#' : '^';
  mapWithObstacle[position[0]] = row.join('');

  return mapWithObstacle;
}

function getPatrolPathObstaclePositions() {
  let guardPosition = getGuardStartPosition();
  let count = 0;

  for (let row = 0; row < mapInput.length; row++) {
    for (let col = 0; col < mapInput[row].length; col++) {
      const obstaclePosition = [row, col]

      const mapInputWithCustomObstacle = setObstacle(obstaclePosition);

      const isGuardStuck = isGuardStuckInLoop(mapInputWithCustomObstacle, guardPosition, obstaclePosition)
      if (isGuardStuck) {
        count++;
      }
    }
  }

  return count;
}

console.log(getPatrolPathUniquePositions().size);
console.log(getPatrolPathObstaclePositions());



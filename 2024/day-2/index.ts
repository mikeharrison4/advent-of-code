import { readFile } from "../readFile";

const puzzleInput = readFile('./input.txt');

const reports = puzzleInput.trim().split('\n').map(report => report.split(' ').map(item => Number(item)));

function isReportSafe(report: Array<number>) {
  let isSafe = true;
  const isIncreasing = report[0] < report[1];

  report.map((item, index) => {
    if (isIncreasing && item < report[index - 1]) {
      isSafe = false;
    }

    if (!isIncreasing && item > report[index - 1]) {
      isSafe = false;
    }

    const diff = Math.abs(item - report[index - 1]);
    if (diff === 0 || diff > 3) {
      isSafe = false;
    }
  });

  return isSafe;
}

const resultPart1 = reports.map(report => isReportSafe(report))
const resultPart2 = reports.map(report => {
  const reportsWithLevelMissing = report.map((_, index) => [...report.slice(0, index), ...report.slice(index + 1)]);
  return reportsWithLevelMissing.every(report => {
    return !isReportSafe(report)
  })
})

console.log(resultPart1.filter(Boolean).length);
console.log(resultPart2.filter(item => !item).length);

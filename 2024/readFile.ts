import { readFileSync } from 'fs';

export function readFile(filePath: string) {
  try {
    const data = readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

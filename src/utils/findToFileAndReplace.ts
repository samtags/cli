import path from 'path';
import fs from 'fs';
import replaceAll from './replaceAll';

export default function findToFileAndReplace(
  filePath: string,
  strToReplace: string,
  replaceValue: string
) {
  const file = fs.readFileSync(filePath);
  const fileContent = file.toString();

  const updatedFileContent = replaceAll(
    fileContent,
    strToReplace,
    replaceValue
  );

  fs.writeFileSync(path.resolve(filePath), updatedFileContent);
}

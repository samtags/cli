// import tmp from 'tmp';
import fs from 'fs';
import path from 'path';

export const mockFn = jest.fn();

export default function functions() {
  if (process.env.NODE_ENV === 'test') mockFn();

  // get app dir
  // get project name

  // const tempDotEnv = tmp.fileSync();
  // const tempDockerComposeFile = tmp.fileSync();

  console.log('filename: ', __dirname);
  const dotEnv = fs.readFileSync(path.resolve(__dirname, './services/env.ts'));
  console.log(dotEnv);

  //
  // fs.writeFileSync(dotEnv.name, '');

  // tempDotEnv.removeCallback();
}

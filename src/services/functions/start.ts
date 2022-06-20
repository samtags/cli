import fs from 'fs';
import path from 'path';
import fsExtra from 'fs-extra';
import { spawnSync } from 'child_process';
import os from 'os';
import chmodr from 'chmodr';

export const mockFn = jest.fn();

export default function startFunction() {
  if (process.env.NODE_ENV === 'test') mockFn();

  // get app dir
  const appDir = process.cwd();

  // get project name
  let projectName;

  // read package.json
  const packageJson = fs.readFileSync(path.resolve(appDir, 'package.json'));

  try {
    const packageObj = JSON.parse(packageJson.toString());
    projectName = packageObj.name;
  } catch {
    // unsupported app
  }

  const tmpDir = path.resolve(os.tmpdir(), projectName);

  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  // create temp dir
  fs.mkdirSync(tmpDir);

  // set permission of tmp dir
  fs.chmodSync(tmpDir, 0o700);

  // copy docker conifgs
  const dockerConfigSourcePath = path.resolve(
    __dirname,
    './services/functions/docker'
  );

  fsExtra.copySync(dockerConfigSourcePath, tmpDir);

  // change permission
  chmodr(tmpDir, 0o777, () => {});

  // replace temp .env fields
  const tempEnvPath = path.resolve(tmpDir, '.env');
  const tempEnvFile = fs.readFileSync(tempEnvPath);
  let tempEnvFileContentStr = tempEnvFile.toString();

  tempEnvFileContentStr = tempEnvFileContentStr.replace('[dir]', appDir);
  tempEnvFileContentStr = tempEnvFileContentStr.replace('[project]', projectName); // prettier-ignore
  tempEnvFileContentStr = tempEnvFileContentStr.replace('[tmpPath]', tmpDir); // prettier-ignore

  // Copy users .env to temp .env
  const clientEnvFilePath = path.resolve(appDir, '.env');
  const clientEnvFile = fs.readFileSync(clientEnvFilePath);

  tempEnvFileContentStr += `\n${clientEnvFile.toString()}`;

  fs.writeFileSync(tempEnvPath, tempEnvFileContentStr);

  const b = spawnSync('docker-compose', [
    '-f',
    path.resolve(tmpDir, 'docker-compose.yml'),
    'build',
    '--no-cache',
    '--force-rm',
  ]);

  console.log('Done: ', b.stdout.toString());
  console.log('Done[err]: ', b.stderr.toString());

  const up = spawnSync('docker-compose', [
    '-f',
    path.resolve(tmpDir, 'docker-compose.yml'),
    'up',
    '-d',
  ]);

  console.log('Done: ', up.stdout.toString());
  console.log('Done[err]: ', up.stderr.toString());
}

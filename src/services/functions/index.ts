import tmp from 'tmp';
import fs from 'fs';
import path from 'path';
import fsExtra from 'fs-extra';
import { spawnSync } from 'child_process';

export const mockFn = jest.fn();

export default function functions() {
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

  const tmpPath = path.resolve('/tmp/', projectName);

  if (fs.existsSync(tmpPath)) {
    fs.rmSync(tmpPath, { recursive: true, force: true });
  }

  const tmpDir = tmp.dirSync({
    mode: 0o644,
    name: projectName,
  });

  // copy docker conifgs
  const dockerConfigSourcePath = path.resolve(
    __dirname,
    './services/functions/docker'
  );

  fsExtra.copySync(dockerConfigSourcePath, tmpDir.name);

  // replace temp .env fields
  const tempEnvPath = path.resolve(tmpDir.name, '.env');
  const tempEnvFile = fs.readFileSync(tempEnvPath);
  let tempEnvFileContentStr = tempEnvFile.toString();

  tempEnvFileContentStr = tempEnvFileContentStr.replace('[dir]', appDir);
  tempEnvFileContentStr = tempEnvFileContentStr.replace('[project]', projectName); // prettier-ignore
  tempEnvFileContentStr = tempEnvFileContentStr.replace('[tmpPath]', tmpDir.name); // prettier-ignore

  // Copy users .env to temp .env
  const clientEnvFilePath = path.resolve(appDir, '.env');
  const clientEnvFile = fs.readFileSync(clientEnvFilePath);

  tempEnvFileContentStr += `\n${clientEnvFile.toString()}`;

  fs.writeFileSync(tempEnvPath, tempEnvFileContentStr);

  const b = spawnSync('docker-compose', [
    '-f',
    path.resolve(tmpDir.name, 'docker-compose.yml'),
    'build',
    '--no-cache',
    '--force-rm',
  ]);

  console.log('Done: ', b.stdout.toString());
  console.log('Done[err]: ', b.stderr.toString());

  const up = spawnSync('docker-compose', [
    '-f',
    path.resolve(tmpDir.name, 'docker-compose.yml'),
    'up',
    '-d',
  ]);

  console.log('Done: ', up.stdout.toString());
  console.log('Done[err]: ', up.stderr.toString());
}

import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

export const mockFn = jest.fn();

export default function stopFunction() {
  if (process.env.NODE_ENV === 'test') mockFn();

  // get app dir
  const appDir = process.cwd();

  // get project name
  let projectName;

  // read app config
  const configJson = fs.readFileSync(
    path.resolve(appDir, '.config', '.app-config.json')
  );

  try {
    const configObj = JSON.parse(configJson.toString());
    projectName = configObj.project.name;
  } catch {
    // unsupported app
  }

  const tmpPath = path.resolve('/tmp/', projectName);

  if (fs.existsSync(tmpPath)) {
    const b = spawnSync('docker-compose', [
      '-f',
      path.resolve(tmpPath, 'docker-compose.yml'),
      'down',
    ]);

    console.log('Done: ', b.stdout.toString());
    console.log('Done[err]: ', b.stderr.toString());
  }
}

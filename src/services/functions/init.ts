import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import fsExtra from 'fs-extra';
import getFiles from '../../utils/getFiles';
import findToFileAndReplace from '../../utils/findToFileAndReplace';
import { spawnSync } from 'child_process';

export default function initFunction() {
  // ask project name

  const questions = [
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter project name',
    },
  ];

  inquirer.prompt(questions).then(async (answers: any) => {
    // todo: check if project name is existing to the account
    console.log(JSON.stringify(answers, null, '  '));

    const { projectName } = answers;

    // copy files to the current directory where the script run
    const currentDir = process.cwd();

    // create dir base on project name
    fs.mkdirSync(path.resolve(currentDir, projectName));

    const templaceSourcePath = path.resolve(
      __dirname,
      './services/functions/template'
    );

    // todo: process template in temp instead of direct to client directory

    // copy files
    fsExtra.copySync(templaceSourcePath, path.resolve(currentDir, projectName));

    const files = await getFiles(path.resolve(currentDir, projectName));
    files.forEach((file: string) => {
      // update projectName -> input: project name
      findToFileAndReplace(file, 'projectName', projectName);
    });

    // npm install
    spawnSync('npm', ['i', '--prefix', `./${projectName}`]);
  });
}

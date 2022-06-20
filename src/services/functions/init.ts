import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import fsExtra from 'fs-extra';
import getFiles from '../../utils/getFiles';
import findToFileAndReplace from '../../utils/findToFileAndReplace';

export default function initFunction() {
  // ask project name

  const questions = [
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter project name',
    },
  ];

  inquirer.prompt(questions).then((answers: any) => {
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

    getFiles(path.resolve(currentDir, projectName))
      .then((files: string[]) => {
        files.forEach((file: string) => {
          // update projectName -> input: project name
          findToFileAndReplace(file, 'projectName', projectName);
        });
      })
      .catch((e: any) => console.error(e));
  });
}

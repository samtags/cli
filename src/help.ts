import { Command } from 'commander';

const program = new Command();

export default function helper() {
  program
    .name('appName')
    .description('Backend-as-a-service solutions')
    .version('0.0.1');

  program
    .command('start')
    .description('Start appName service')
    .option('-f, --functions', 'Starts functions service locally');

  program
    .command('stop')
    .description('Stop appName service')
    .option('-f, --functions', 'Stops functions service locally');

  program.parse();
}

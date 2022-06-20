import minimist from 'minimist';
import helper from './help';
import startFunction from './services/functions/start';
import stopFunction from './services/functions/stop';
import initFuntion from './services/functions/init';

const argv = minimist(process.argv.slice(2), {
  boolean: ['function'],
});

export default function start(argv: minimist.ParsedArgs) {
  if (process.env.NODE_ENV !== 'test') helper();

  if (argv._.includes('start')) {
    // start function
    if (argv.functions) return startFunction();
  }

  if (argv._.includes('stop')) {
    if (argv.functions) return stopFunction();
  }

  if (argv._.includes('init')) {
    // init functions
    if (argv.functions) return initFuntion();
  }
}

if (process.env.NODE_ENV !== 'test') start(argv);

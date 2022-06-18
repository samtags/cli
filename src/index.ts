import minimist from 'minimist';
import helper from './help';
import functions from './services/functions';

const argv = minimist(process.argv.slice(2), {
  boolean: ['function'],
});

export default function start(argv: minimist.ParsedArgs) {
  if (process.env.NODE_ENV !== 'test') helper();

  if (argv._.includes('start')) {
    // start function
    return functions();
  }
}

if (process.env.NODE_ENV !== 'test') start(argv);

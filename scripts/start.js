const { spawn } = require('child_process');
const path = require('path');
const through2 = require('through2');
const addShebangFlag = require('./post.build').addShebangFlag;

const start = spawn('tsdx', ['watch']);

process.stdout.pipe(start.stdout);
start.stdout.pipe(process.stdout);

process.stderr.pipe(start.stderr);
start.stderr
  .pipe(through2(processErr)) //
  .pipe(process.stdout);

function processErr(buff, enc, next) {
  const output = buff.toString();
  if (output.includes('Compiled successfully')) {
    runPostBuildScripts();
    addShebangFlag();
  }

  next(null, buff);
}

function runPostBuildScripts() {
  const functions = spawn('node', [
    path.resolve(__dirname, './functions', 'post.build.js'),
  ]);

  process.stdout.pipe(functions.stdout);
  functions.stdout.pipe(process.stdout);
}

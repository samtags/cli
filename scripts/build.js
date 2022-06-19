const { spawn } = require('child_process');
const path = require('path');
const through2 = require('through2');

const build = spawn('tsdx', ['build']);

process.stdout.pipe(build.stdout);
build.stdout
  .pipe(through2(processOutput)) //
  .pipe(process.stdout);

function processOutput(buff, enc, next) {
  const output = buff.toString();
  if (output.includes('✓ Building modules')) {
    runPostBuildScripts();
  }

  next(null, buff);
}

function runPostBuildScripts() {
  const functions = spawn('node', [
    path.resolve(__dirname, './functions', 'post.build.js'),
  ]);

  functions.stdout.on('data', data => {
    console.log(data.toString());
    if (data.toString().includes('[post-script]: functions (COMPLETED)')) {
      // exit script
      process.exit(0);
    }
  });
}

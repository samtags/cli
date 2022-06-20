const fs = require('fs');
const path = require('path');
const chmodr = require('chmodr');

const entryFile = path.resolve(__dirname, '../dist/index.js');

function addShebangFlag() {
  const data = fs.readFileSync(entryFile);

  if (!data.toString().includes('#!/usr/bin/env node')) {
    const fd = fs.openSync(entryFile, 'w+');
    const insert = Buffer.from('#!/usr/bin/env node \n');
    fs.writeSync(fd, insert, 0, insert.length, 0);
    fs.writeSync(fd, data, 0, data.length, insert.length);
    fs.close(fd, err => {
      if (err) throw err;
    });
  }
}

function makeExecutable() {
  chmodr(entryFile, 0o777, () => {});
}

exports.addShebangFlag = addShebangFlag;
exports.makeExecutable = makeExecutable;

const fs = require('fs');
const path = require('path');

function addShebangFlag() {
  const entryFile = path.resolve(__dirname, '../dist/index.js');

  const data = fs.readFileSync(entryFile);
  const fd = fs.openSync(entryFile, 'w+');
  const insert = Buffer.from('#!/usr/bin/env node \n');
  fs.writeSync(fd, insert, 0, insert.length, 0);
  fs.writeSync(fd, data, 0, data.length, insert.length);
  fs.close(fd, err => {
    if (err) throw err;
  });
}

exports.addShebangFlag = addShebangFlag;

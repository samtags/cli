// copy the docker files on dist

const fs = require('fs-extra');
const path = require('path');

const source = path.resolve(__dirname, '../../src/services/functions/docker');
const destination = path.resolve(
  __dirname,
  '../../dist/services/functions/docker'
);

fs.copy(source, destination, function(err) {
  if (err) {
    console.log('An error occurred while copying the folder.');
    return console.error(err);
  }
  console.log('[post-script]: functions (COMPLETED)');
});

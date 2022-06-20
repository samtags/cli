// copy the docker files on dist

const fs = require('fs-extra');
const path = require('path');

const dockerPath = path.resolve(
  __dirname,
  '../../src/services/functions/docker'
);
const dockerPathDestination = path.resolve(
  __dirname,
  '../../dist/services/functions/docker'
);

fs.copy(dockerPath, dockerPathDestination, function(err) {
  if (err) {
    console.log('An error occurred while copying the folder.');
    return console.error(err);
  }
  console.log('[post-script]: docker copied Done.');
});

// copy the template files on dist

const templatePath = path.resolve(
  __dirname,
  '../../src/services/functions/template'
);
const templatePathDestination = path.resolve(
  __dirname,
  '../../dist/services/functions/template'
);

fs.copy(templatePath, templatePathDestination, function(err) {
  if (err) {
    console.log('An error occurred while copying the folder.');
    return console.error(err);
  }
  console.log('[post-script]: template copied Done.');
});

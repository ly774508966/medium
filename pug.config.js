const shell = require('shelljs');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'examples/src/js');
const demos = [];
shell.ls(`${dir}`).forEach(file => {
  if (fs.lstatSync(path.join(dir, file)).isDirectory()) {
    demos.push(file.split('.js')[0]);
  }
});

const obj = JSON.stringify({
  demos
});

const production = process.env.NODE_ENV === 'production';

const watch = production ? '' : '-w';

// To make developing an example faster
// set the env variable EXAMPLE e.g:
// EXAMPLE=linegeometry npm run start
const exampleDir = process.env.EXAMPLE;

let entry = './examples/src/templates/[!_]*.pug';

if (exampleDir !== undefined) {
  entry = `./examples/src/templates/${exampleDir}.pug`;
}

const cmd = `pug --obj '${obj}' ${watch} ${entry} --out ./examples`;

shell.exec(cmd, code => {
  if (code !== 0) {
    console.log('Pug cli: error'); // eslint-disable-line no-console
  }
});

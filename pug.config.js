const shell = require('shelljs');
const pkg = require('./package.json');
const examples = require('./examples/examples.json');

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

const obj = JSON.stringify({
  description: pkg.description,
  examples
});

const cmd = `pug --silent --obj '${obj}' ${watch} ${entry} --pretty --out ./examples`;

shell.exec(cmd, code => {
  if (code !== 0) {
    console.log('Pug cli: error'); // eslint-disable-line no-console
  }
});

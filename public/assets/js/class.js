const util = require('util');
const fs = require('fs');

const readData = util.promisify(fs.readFile);
const writeData = util.promisify(fs.writeFile);
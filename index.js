'use strict';

const {ls} = require('fs');
const util = require('util');
const { join } = require('path')
const { lstatSync, readdirSync } = require('fs')

const isDirectory = source => lstatSync(source).isDirectory()
let files, dir;
let obj = {};

try {
  files = readdirSync(`${process.cwd()}/native_modules`)
  dir = files.map(name => ({path: join(`${process.cwd()}/native_modules`, name), name})).filter(({path,name}) => isDirectory(path))
} catch (err) {
  console.log(err);
}

for (let item in dir) {
  obj[dir[item].name] = require(dir[item].path)
}

module.exports = obj;
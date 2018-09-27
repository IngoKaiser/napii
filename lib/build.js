'use strict';

const fs = require('fs');
const util = require('util');
const rimrafCB = require('rimraf');
const cloneCB = require('./clone');
const {spawn} = require('child_process');

const rimraf = util.promisify(rimrafCB);
const mkdir = util.promisify(fs.mkdir);
const access = util.promisify(fs.access);
const clone = util.promisify(cloneCB);

// helper
const to = promise => {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

let err;

module.exports = nativeDependencies => {
  rimraf(`${process.cwd()}/native_modules`)
  .then(() => {
    return mkdir(`${process.cwd()}/native_modules`);
  })
  .then(async () => {
    for (let item in nativeDependencies) {
      switch (nativeDependencies[item].type) {
        case 'git':
          [err] = await to(clone(nativeDependencies[item].source, `${process.cwd()}/native_modules/${item}`))
          if(err) console.error(`Error on cloning ${item} Repository`);

          // const child = spawn('yarn', {
          const child = spawn('npm', ['install'], {
            cwd: `${process.cwd()}/native_modules/${item}`
          });
          child.on('close', async status => {
            [err] = await to(access (`${process.cwd()}/native_modules/${item}/build/Release/${item}.node`, fs.constants.F_OK))
            if(err) console.error(`Error on building ${item}.node`);
            else console.log(`Native Module: '${item}' built successfully.`);
          })
          break;
      
        default:
          console.log(`Native Module: '${item}' not built. Type: '${nativeDependencies[item].type}' not supported yet.`);
          break;
      }
    }
  })
  .catch(err => console.log(err))
}
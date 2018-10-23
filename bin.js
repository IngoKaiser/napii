#!/usr/bin/env node

const build = require('./lib/build')
const pkg = require(`${process.cwd()}/package.json`);
const fs = require('fs');

let help = false;
let a = false;
let b = false;

var args = process.argv.slice(2).filter(arg => {
  if (arg.match(/^(-+|\/)(h(elp)?|\?)$/))
    help = true
  else if (arg.match(/^(-+|\/)(a(dd)?|\?)$/))
    a = true
  else if (arg.match(/^(-+|\/)(b(uild)?|\?)$/))
    b = true

  return !!arg
})

if (help || args.length === 0 || !(a || b)) {
  // If they didn't ask for help, then this is not a "success"
  var log = help ? console.log : console.error
  log('Usage: napii task [...]')
  log('')
  log('  Package for adding NAPI-Modules to project just like package manager.')
  log('')
  log('Options:')
  log('')
  log('  -h, --help     Display this usage info.')
  log('  -a, --add      Add N-API Module to nativeDependencies.')
  log('  -b, --build    Build all N-API Modules.')
  process.exit(help ? 0 : 1)
} else if (b) {
  if(!pkg.hasOwnProperty('nativeDependencies')) {
    console.error(`There are no nativeDependencies to be built.`)
  }
  else {
    const nativeDependencies = pkg.nativeDependencies;
    build(nativeDependencies);
  }
} else if (a) {
  if (!process.argv[3] || !process.argv[4] || !process.argv[5]) {
    console.error(`Please rerun with arguments 'Name', Type' and 'Repository'. E.g. 'napii -a hello git path/to/your/helloRepo.git'`)
  } else if (process.argv[4]!='git') {
    console.error(`Only Type: 'git' supported at the moment`)
  } else {
    if(!pkg.hasOwnProperty('nativeDependencies')) {
      pkg['nativeDependencies'] = {}
    }
    pkg['nativeDependencies'][process.argv[3]] = {
      type: process.argv[4],
      source: process.argv[5]
    }
    fs.writeFile(`${process.cwd()}/package.json`,JSON.stringify(pkg,null,2),err => {
      if(err) {
        console.error('Error on writing package.json.')
      } else {
        console.log('Package successfully added to package.json.');
      }
      
    })
  }
}
#!/usr/bin/env node

const pkg = require(`${process.cwd()}/package.cpp.json`)
const build = require('./lib/build')
build(pkg);
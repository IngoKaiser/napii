# napii
> Easily adding node.js N-API Modules to your project!

* Add native modules to your project.
* Access all native modules just by `const napii = require('napii);`.
* Example of native module is attached.
* Only Git-Repositories supported right now.

## Prerequisites

N-API Module like attached Example with following structure

```bash
lib/
  cpp/
    napi.cc
    module.hpp
  js/
    module.js #optional - if same module exists in javascript
test/ #optional
binding.gyp
index.hpp
index.js
package.json
README.md #optional but recommended
```

## Getting Started

* For use in C++

  Just add `#include "<native_module>/index.hpp"` to your header.

+ For using in node.js

  - Yarn is recommended: `npm install -g yarn`.

  - Install package: `yarn add --dev napii` or install it globally with `yarn global add napii`.

## Usage

```bash
  # Add your N-API Modules with...

  # Run:
  ./node_modules/.bin/napii -a <name> <type> <repo>

  #OR

  # Add to your npm scripts:
  "add:native": "napii -a"

  # Run:
  yarn add:native <name> <type> <repo>

  #OR

  # Run globally:
  napii -a <name> <type> <repo>
```

This adds dependecy to your package.json like example below.

```bash
{
  ...

  "nativeDependencies": {
    "sample": {
      "type": "git",
      "source": "https://github.com/path/to/your/repository.git"
    }
  }
  ...
}
```

```bash
  # Build your modules with...

  # Run
  ./node_modules/.bin/napii -b

  #OR

  # Run globally
  napii -b

  # For automised build add to your npm scripts
  "preinstall": "napii -b"
```

```bash
# Use native modules in your code.
const { sample } = require('napii');

sample.<function>()
```
# napii
> Yet another node.js N-API Import Module

* Add native modules to your project.
* Access all native modules just by `const napii = require('napii);`.
* Example of native module is attached.
* Only Git-Repositories suppoerted right now.

## Getting Started

* For use in C++

  Just add `#include "<native_module>/index.hpp"` to your header.

+ For using in node.js

  - install package: `yarn add --dev napii`

  - create package.cpp.json in your root directory

  ```bash
    {
      "dependencies": {
        "sample": {
          "type": "git",
          "source": "https://github.com/path/to/your/repository.git"
        }
      }
    }
  ```

  - add `"preinstall": "napii"` to your npm scripts

  - use native modules in your code

  ```bash
      const { sample } = require('napii');

      sample.<function>()
    ```
# LiteRT/Gravatar

[![npm version](https://img.shields.io/npm/v/@litert/gravatar.svg?colorB=brightgreen)](https://www.npmjs.com/package/@litert/gravatar "Stable Version")
[![License](https://img.shields.io/npm/l/@litert/gravatar.svg?maxAge=2592000?style=plastic)](https://github.com/litert/gravatar/blob/master/LICENSE)

A toolkits for using gravatar.

## Requirement

- TypeScript v2.6.1 (or newer)

## Installation

Install by NPM:

```sh
npm i @litert/gravatar --save
```

## Usage

Here is an example for Node.js: (in TypeScript)

```ts
import * as gravatar from "@litert/gravatar";
import * as crypto from "crypto";

// before using it, please inject a MD5 function, e.g.
gravatar.setMD5Function(function(email: string): string {

    let hasher = crypto.createHash("md5");

    hasher.update(email);

    return hasher.digest().toString("hex");
});

console.log(gravatar.getAvatarUrl("i.am.x.fenying@gmail.com"));
```

## License

This library is published under [MIT](./LICENSE) license.

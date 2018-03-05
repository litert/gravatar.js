/*
   +----------------------------------------------------------------------+
   | LiteRT Gravatar.js Library                                           |
   +----------------------------------------------------------------------+
   | Copyright (c) 2018 Fenying Studio                                    |
   +----------------------------------------------------------------------+
   | This source file is subject to version 2.0 of the Apache license,    |
   | that is bundled with this package in the file LICENSE, and is        |
   | available through the world-wide-web at the following url:           |
   | https://github.com/litert/gravatar.js/blob/master/LICENSE            |
   +----------------------------------------------------------------------+
   | Authors: Angus Fenying <fenying@litert.org>                          |
   +----------------------------------------------------------------------+
 */

// tslint:disable:no-console

import * as gravatar from "./index";
import * as crypto from "crypto";

gravatar.setMD5Function(function(email: string): string {

    let hasher = crypto.createHash("md5");

    hasher.update(email);

    return hasher.digest().toString("hex");
});

console.log(gravatar.getAvatarUrl("i.am.x.fenying@gmail.com"));

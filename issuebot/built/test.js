"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const thunderstore_1 = require("./thunderstore");
function callback(x, y, z) {
    console.log(x);
    console.log(y);
    console.log(z);
}
const instance = new thunderstore_1.Thunderstore("hunter2", "HS256", "http://localhost/api");
instance.deprecate({
    packageName: "LeagueSandboxBot-BepInExPack",
    user: "66561152137564160",
}, callback);

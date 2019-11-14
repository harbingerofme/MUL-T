"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atob = require("atob");
const thunderstore_1 = require("./thunderstore");
const config_1 = require("./config");
function callback(x, y, z) {
    let msg = "";
    if (x) {
        msg += x + "\n\n";
    }
    if (z) {
        msg += z;
    }
    console.log(msg);
}
let secret = atob(config_1.config.thunderstoreApiSecret).trim();
const thunderstore = new thunderstore_1.Thunderstore(secret, config_1.config.thunderstoreApiKeyId, config_1.config.thunderstoreApiAlgorithm, config_1.config.thunderstoreApiUrl);
thunderstore.deprecate({
    packageName: "LeagueSandboxBot-BepInExPack",
    user: "66561152137564160",
}, callback);

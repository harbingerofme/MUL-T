import * as atob from 'atob'
import { Thunderstore } from './thunderstore'
import { config } from './config'


function callback(x, y, z) {
    let msg = ""
    if (x) {
        msg += x + "\n\n";
    }
    if (z) {
        msg += z;
    }
    console.log(msg);
}

let secret = atob(config.thunderstoreApiSecret).trim()

const thunderstore = new Thunderstore(
    secret,
    config.thunderstoreApiKeyId,
    config.thunderstoreApiAlgorithm,
    config.thunderstoreApiUrl,
)

thunderstore.deprecate({
    packageName: "LeagueSandboxBot-BepInExPack",
    user: "66561152137564160",
}, callback);

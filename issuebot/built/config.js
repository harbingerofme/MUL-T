"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let conf;
try {
    conf = require('../config.json');
}
catch (e) {
    conf = {
        githubToken: process.env.GITHUB_TOKEN,
        githubName: process.env.GITHUB_NAME,
        discordToken: process.env.DISCORD_TOKEN,
        thunderstoreApiSecret: process.env.THUNDERSTORE_API_SECRET,
        thunderstoreApiAlgorithm: process.env.THUNDERSTORE_API_ALGORITHM,
        thunderstoreApiKeyId: process.env.THUNDERSTORE_API_KEY_ID,
        thunderstoreApiUrl: process.env.THUNDERSTORE_API_URL,
    };
}
exports.config = conf;

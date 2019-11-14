"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const request = require("request");
class Thunderstore {
    constructor(secret, keyId, algorithm, apiUrl) {
        this.secret = secret;
        this.keyId = keyId;
        this.algorithm = algorithm;
        this.apiUrl = apiUrl;
    }
    deprecate(params, callback) {
        const data = {
            package: params.packageName,
            user: params.user,
        };
        const encoded = jwt.sign(data, this.secret, {
            algorithm: this.algorithm,
            header: {
                kid: this.keyId,
            }
        });
        return request({
            method: "POST",
            uri: this.apiUrl + "/v1/bot/deprecate-mod/",
            headers: {
                "Content-Type": "application/jwt",
            },
            body: encoded,
        }, callback);
    }
}
exports.Thunderstore = Thunderstore;

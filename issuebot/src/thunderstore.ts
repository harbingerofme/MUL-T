import * as jwt from 'jsonwebtoken'
import * as request from 'request'


interface DeprecateParams {
    packageName: string;
    user: string;
}


export class Thunderstore {
    secret: string
    keyId: string
    algorithm: string
    apiUrl: string

    constructor(secret: string, keyId: string, algorithm: string, apiUrl: string) {
        this.secret = secret;
        this.keyId = keyId;
        this.algorithm = algorithm;
        this.apiUrl = apiUrl;
    }

    deprecate(params: DeprecateParams, callback?: request.RequestCallback): request.Request {
        const data = {
            package: params.packageName,
            user: params.user,
        };
        const encoded = jwt.sign(
            data,
            this.secret,
            {
                algorithm: this.algorithm,
                header: {
                    kid: this.keyId,
                }
            }
        );
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

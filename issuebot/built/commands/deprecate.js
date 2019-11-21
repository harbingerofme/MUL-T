"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const issuebot_1 = require("../issuebot");
const discord_harmony_1 = require("discord-harmony");
class DeprecateCommand extends discord_harmony_1.Command {
    execute() {
        if (!this.args) {
            return;
        }
        issuebot_1.default.thunderstore.deprecate({
            packageName: this.args[0],
            user: this.message.author.id,
        }, (error, response, body) => this.handleResponse(error, response, body));
    }
    handleResponse(error, response, body) {
        if (response && response.statusCode !== 200) {
            let message = "";
            if (error) {
                message += JSON.stringify(error, null, 4) + "\n\n";
            }
            if (body) {
                message += body, null, 4;
            }
            let reply = ERROR_TEMPLATE.replace('{PLACEHOLDER}', message);
            this.message.reply(reply);
        }
        else {
            this.message.reply(SUCCESS_TEMPLATE);
        }
    }
}
exports.DeprecateCommand = DeprecateCommand;
const ERROR_TEMPLATE = `
Command should be: !deprecate {Package Full Name}
Example: !deprecate "bbepis-BepInExPack"
An error occurred while executing the command.
Details:
\`\`\`
{PLACEHOLDER}
\`\`\`
`;
const SUCCESS_TEMPLATE = `
Package deprecated successfully!
`;

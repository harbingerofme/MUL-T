"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_harmony_1 = require("discord-harmony");
const issuebot_1 = require("../issuebot");
class PasterCommand extends discord_harmony_1.Command {
    execute() {
        if (!this.args || this.message.guild === null) {
            return;
        }
        if (this.args.length < 2) {
            this.message.reply(ERROR_TEMPLATE);
            return;
        }
        if (this.args[0].toLowerCase().startsWith("del")) {
            if (issuebot_1.default.pasteDB.handlePaste(this.args[0], this.message.guild.id, this.args[1], null)) {
                this.message.reply(DELETE_SUCCESS_TEMPLATE.replace(`{PLACEHOLDER}`, this.args[1]));
            }
            else {
                this.message.reply(DELETE_FAIL_TEMPLATE.replace(`{PLACEHOLDER}`, this.args[1]));
            }
            return;
        }
        if (this.args.length < 3 ||
            !(this.args[0].toLowerCase().startsWith("add") ||
                this.args[0].toLowerCase().startsWith("edit"))) {
            this.message.reply(ERROR_TEMPLATE);
            return;
        }
        let pasteBody = this.create_paste(this.args[1], this.args[2], `${this.message.author.username}#${this.message.author.discriminator}`, new Date());
        if (issuebot_1.default.pasteDB.handlePaste(this.args[0], this.message.guild.id, this.args[1], pasteBody)) {
            this.message.reply(SUCCESS_TEMPLATE.replace(`{PLACEHOLDER}`, this.args[1]));
        }
    }
    create_paste(title, message, author, time) {
        let obj = { "embed": {
                "author": {
                    "name": title
                },
                "description": message,
                "footer": { "text": author },
                "timestamp": time
            } };
        return obj;
    }
}
exports.PasterCommand = PasterCommand;
const ERROR_TEMPLATE = `
Command should be: !paster {add/del} {Title} {Message}
Example: !paster "add" "bep" "If you've updated BepInEx to 3.0.0 by just dragging and dropping, your mods won't work."
An error occurred while creating the paste.
`;
const SUCCESS_TEMPLATE = `
Paste created successfully! {PLACEHOLDER}
`;
const DELETE_FAIL_TEMPLATE = `
Paste deleted successfully! {PLACEHOLDER}
`;
const DELETE_SUCCESS_TEMPLATE = `
Paste deleted successfully! {PLACEHOLDER}
`;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Harmony = require("discord-harmony");
const atob = require("atob");
const github_1 = require("./github");
const thunderstore_1 = require("./thunderstore");
const pasteDB_1 = require("./pasteDB");
const commands_1 = require("./commands");
const config_1 = require("./config");
class IssueBot extends Harmony.Bot {
    constructor() {
        super();
        this.gitHub = new github_1.GitHub(config_1.config.githubToken);
        this.thunderstore = new thunderstore_1.Thunderstore(atob(config_1.config.thunderstoreApiSecret).trim(), config_1.config.thunderstoreApiKeyId, config_1.config.thunderstoreApiAlgorithm, config_1.config.thunderstoreApiUrl);
        this.pasteDB = new pasteDB_1.PasteDB(this.client);
    }
    loadCommands() {
        super.loadCommands();
        this.commandManager.addCommand('issue', commands_1.IssueCommand);
        this.commandManager.addCommand('deprecate', commands_1.DeprecateCommand);
        this.commandManager.addCommand(`paster`, commands_1.PasterCommand);
    }
}
exports.IssueBot = IssueBot;
const instance = new IssueBot();
instance.start(config_1.config.discordToken);
exports.default = instance;

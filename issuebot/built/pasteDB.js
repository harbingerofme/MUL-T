"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FS = require("fs");
const issuebot_1 = require("./issuebot");
const PREFIX = "~";
const jsonPath = "./pasteDB.json";
class PasteDB {
    constructor(client) {
        if (FS.existsSync(jsonPath)) {
            console.log("[PasteDB] Reading database file.");
            this.database = JSON.parse(FS.readFileSync(jsonPath, 'utf8'));
            this.databaseDirty = false;
        }
        else {
            this.database = {};
            console.log("[PasteDB] Creating new database file.");
            this.databaseDirty = true;
        }
        setInterval(this.saveDataBase, 1000 * 60 * 1);
        client.on("message", message => this.checkMessage(message));
    }
    handlePaste(mode, guild, title, content) {
        if (mode.toLowerCase().startsWith("del")) {
            return this.deletePaste(guild, title);
        }
        if (mode.toLowerCase().startsWith("add") || mode.toLowerCase().startsWith("edit")) {
            return this.addPaste(guild, title, content);
        }
    }
    deletePaste(guild, title) {
        if (!(guild in this.database) || !(title in this.database[guild])) {
            return false;
        }
        delete this.database[guild][title];
        this.databaseDirty = true;
        return true;
    }
    addPaste(guild, title, content) {
        if (!(guild in this.database)) {
            this.database[guild] = {};
        }
        this.database[guild][title] = content;
        this.databaseDirty = true;
        return true;
    }
    saveDataBase() {
        if (!issuebot_1.default.pasteDB.databaseDirty) {
            return;
        }
        FS.writeFile(jsonPath, JSON.stringify(issuebot_1.default.pasteDB.database), 'utf8', function (err) {
            if (err) {
                issuebot_1.default.pasteDB.databaseDirty = true;
                return console.log(err);
            }
            console.log("[PasteDB] Database updated.");
        });
        issuebot_1.default.pasteDB.databaseDirty = false;
    }
    checkMessage(message) {
        if (!message.cleanContent.startsWith(PREFIX)) {
            return;
        }
        var content = message.cleanContent.slice(PREFIX.length);
        if (content.length < 1) {
            return;
        }
        var guild = message.guild.id;
        var name = content.split(' ')[0];
        if (!(guild in this.database) || !(name in this.database[guild])) {
            return false;
        }
        else {
            message.channel.send(this.database[guild][name]);
        }
    }
}
exports.PasteDB = PasteDB;

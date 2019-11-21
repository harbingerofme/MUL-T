import * as FS from 'fs';
import {Client,Snowflake, Message} from 'discord.js';
import Bot from './issuebot'

const PREFIX = "~";
const jsonPath = "./data/pasteDB.json";
const saveInterval = 1000*60*5;

export class PasteDB
{
    database : object
    databaseDirty :  boolean

    constructor(client : Client) {
        if( FS.existsSync(jsonPath) )
        {
            console.log("[PasteDB] Reading database file.");
            this.database = JSON.parse(FS.readFileSync(jsonPath,'utf8'));
            this.databaseDirty = false;
        }
        else
        {
            this.database = {}
            console.log("[PasteDB] Creating new database file.")
            this.databaseDirty = true;
        }
        setInterval(this.saveDataBase,saveInterval);
        client.on("message",  message => this.checkMessage(message) );
    }

    handlePaste(mode:string,guild:Snowflake,title:string,content:object) : boolean{
        if(mode.toLowerCase().startsWith("del")){
            return this.deletePaste(guild,title);
        }
        if(mode.toLowerCase().startsWith("add") || mode.toLowerCase().startsWith("edit")){
            return this.addPaste(guild,title,content);
        }
    }

    deletePaste(guild:Snowflake,title:string):boolean{
        if(!(guild in this.database) || !(title in this.database[guild])){
            return false;
        }
        delete this.database[guild][title];
        this.databaseDirty = true;
        return true;
    }

    addPaste(guild:Snowflake,title:string,content:object):boolean{
        if(!(guild in this.database)){
            this.database[guild] = {};
        }
        this.database[guild][title] = content;
        this.databaseDirty = true;
        return true;
    }

    saveDataBase(){
        if(!Bot.pasteDB.databaseDirty){
            return;
        }
        FS.writeFile(jsonPath,JSON.stringify(Bot.pasteDB.database),'utf8', 
            function(err) {
                if(err) {
                    Bot.pasteDB.databaseDirty = true;
                    return console.log(err);
                }
                console.log("[PasteDB] Database updated.");
            }
            );
            Bot.pasteDB.databaseDirty = false;
    }

    checkMessage(message:Message) {
        if(!message.cleanContent.startsWith(PREFIX))
        {   return; }
        var content = message.cleanContent.slice(PREFIX.length)
        if(content.length < 1) {
          return;
        }

        var guild = message.guild.id;
        var name = content.split(' ')[0]
        if(!(guild in this.database) || !(name in this.database[guild])){
            return false;
        }
        else{
            message.channel.send(this.database[guild][name]);
        }
    }
}
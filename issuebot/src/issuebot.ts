import * as Harmony from 'discord-harmony'
import * as atob from 'atob'
import { GitHub } from './github'
import { Thunderstore } from './thunderstore'
import { PasteDB } from './pasteDB'
import { IssueCommand, DeprecateCommand, PasterCommand } from './commands'
import { config } from './config'

export class IssueBot extends Harmony.Bot {
  gitHub: GitHub
  thunderstore: Thunderstore
  pasteDB : PasteDB

  constructor() {
    super()
    this.gitHub = new GitHub(config.githubToken)
    this.thunderstore = new Thunderstore(
      atob(config.thunderstoreApiSecret).trim(),
      config.thunderstoreApiKeyId,
      config.thunderstoreApiAlgorithm,
      config.thunderstoreApiUrl,
    )
    this.pasteDB = new PasteDB(this.client);
  }

  loadCommands() {
    super.loadCommands()
    this.commandManager.addCommand('issue', IssueCommand)
    this.commandManager.addCommand('deprecate', DeprecateCommand)
    this.commandManager.addCommand(`paster`, PasterCommand);
  }
}

const instance = new IssueBot()
instance.start(config.discordToken)
export default instance as IssueBot

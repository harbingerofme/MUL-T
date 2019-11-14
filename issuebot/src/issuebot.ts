import * as Harmony from 'discord-harmony'
import * as atob from 'atob'
import { GitHub } from './github'
import { Thunderstore } from './thunderstore'
import { IssueCommand, DeprecateCommand } from './commands'
import { config } from './config'

export class IssueBot extends Harmony.Bot {
  gitHub: GitHub
  thunderstore: Thunderstore

  constructor() {
    super()
    this.gitHub = new GitHub(config.githubToken)
    this.thunderstore = new Thunderstore(
      atob(config.thunderstoreApiSecret).trim(),
      config.thunderstoreApiKeyId,
      config.thunderstoreApiAlgorithm,
      config.thunderstoreApiUrl,
    )
  }

  loadCommands() {
    super.loadCommands()
    this.commandManager.addCommand('issue', IssueCommand)
    this.commandManager.addCommand('deprecate', DeprecateCommand)
  }
}

const instance = new IssueBot()
instance.start(config.discordToken)
export default instance as IssueBot

import Bot from '../issuebot'
import { Command }  from 'discord-harmony'

export class DeprecateCommand extends Command {
  execute() {
    if(!this.args) {
      return
    }
    Bot.thunderstore.deprecate({
        packageName: this.args[0],
        user: this.message.author.id,
    }, (error, response, body) => this.handleResponse(error, response, body))
  }

  handleResponse(error, response, body) {
    if(response && response.statusCode !== 200) {
      let message = ""
      if (error) {
          message += JSON.stringify(error, null, 4) + "\n\n"
      }
      if (body) {
          message += body, null, 4
      }
      let reply = ERROR_TEMPLATE.replace('{PLACEHOLDER}', message)
      this.message.reply(reply)
    } else {
        this.message.reply(SUCCESS_TEMPLATE)
    }
  }
}


const ERROR_TEMPLATE =
`
Command should be: !deprecate {Package Full Name}
Example: !issue "bbepis-BepInExPack"
An error occurred while creating the issue.
Details:
\`\`\`
{PLACEHOLDER}
\`\`\`
`

const SUCCESS_TEMPLATE =
`
Package deprecated successfully!
`

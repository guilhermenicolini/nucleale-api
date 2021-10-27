import { Messagefy } from '@/data/protocols'
import Templates from 'email-templates'

export class HtmlMessagefyDecorator implements Messagefy {
  constructor (
    private readonly template: string,
    private readonly messagefy: Messagefy
  ) {}

  async create (data: any): Promise<Messagefy.Result> {
    const templates = new Templates({
      views: {
        root: 'templates'
      }
    })

    const message = await this.messagefy.create(data)
    data.subject = message.subject || data.subject
    message.html = await templates.render(this.template, data)

    return message
  }
}

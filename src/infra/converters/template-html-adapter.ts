import {
  Converter
} from '@/data/protocols'

import Templates from 'email-templates'

export class TemplateHtmlAdapter implements Converter {
  constructor (
    private readonly template: string
  ) { }

  async convert (message: any): Promise<string> {
    const templates = new Templates({
      views: {
        root: 'src/templates'
      }
    })
    const html = await templates.render(this.template, message)
    return html
  }
}

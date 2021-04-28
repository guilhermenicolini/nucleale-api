import {
  Converter
} from '@/data/protocols'

import Templates from 'email-templates'
import pdf from 'html-pdf'

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
    return pdf.create(html, {
      height: '1123px',
      width: '794px',
      quality: '75'
    }).toStream()
  }
}

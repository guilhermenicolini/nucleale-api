import {
  Transformer
} from '@/data/protocols'

import Templates from 'email-templates'
import pdf from 'html-pdf'

export class HtmlPdfTransformer implements Transformer {
  constructor (
    private readonly template: string
  ) { }

  async transform (message: any): Promise<string> {
    const templates = new Templates({
      views: {
        root: 'src/templates'
      }
    })
    const html = await templates.render(this.template, message)
    const document = pdf.create(html, {
      height: '1123px',
      width: '794px',
      quality: '75'
    })
    return document
  }
}

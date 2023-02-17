import {
  Transformer
} from '@/data/protocols'

export class HtmlPdfTransformer implements Transformer {
  constructor (
    private readonly template: string
  ) { }

  async transform (message: any): Promise<string> {
    return `<div><div>${this.template}</div><div>${message}</div></div>`
  }
}

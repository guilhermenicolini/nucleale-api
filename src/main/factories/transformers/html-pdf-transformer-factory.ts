import { HtmlPdfTransformer } from '@/infra/transformers'
import { Transformer } from '@/data/protocols'

export const makeHtmlPdfTransformer = (): Transformer => {
  return new HtmlPdfTransformer('invoice/html')
}

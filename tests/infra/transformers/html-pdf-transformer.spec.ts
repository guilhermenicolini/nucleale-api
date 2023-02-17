import { HtmlPdfTransformer } from '@/infra/transformers'

const template = 'any_template'
const makeSut = (): HtmlPdfTransformer => new HtmlPdfTransformer(template)

describe('TemplateHtml Adapter', () => {
  test('Should return document on success', async () => {
    const sut = makeSut()
    const result = await sut.transform('any_message')
    expect(result).toEqual(`<div><div>${template}</div><div>any_message</div></div>`)
  })
})

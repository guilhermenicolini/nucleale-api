import { TemplateHtmlAdapter } from '@/infra/converters'
import Templates from 'email-templates'

const template = 'any_template'
const makeSut = (): TemplateHtmlAdapter => new TemplateHtmlAdapter(template)

jest.mock('email-templates')

describe('TemplateHtml Adapter', () => {
  test('Should init email-templates with correct values', async () => {
    const sut = makeSut()
    await sut.convert('any_message')
    expect(Templates).toHaveBeenCalledWith({
      views: {
        root: 'src/templates'
      }
    })
  })
})

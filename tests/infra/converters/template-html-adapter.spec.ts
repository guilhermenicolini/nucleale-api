import { TemplateHtmlAdapter } from '@/infra/converters'
import Templates from 'email-templates'

const template = 'any_template'
const makeSut = (): TemplateHtmlAdapter => new TemplateHtmlAdapter(template)

const renderStub = jest.fn().mockImplementation(() => 'any_html')

jest.mock('email-templates', () => jest.fn().mockImplementation(() => {
  return {
    render: renderStub
  }
}))

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

  test('Should call render correct values', async () => {
    const sut = makeSut()
    await sut.convert('any_message')
    expect(renderStub).toHaveBeenCalledWith(template, 'any_message')
  })
})

import { TemplateHtmlAdapter } from '@/infra/converters'
import Templates from 'email-templates'
import pdf from 'html-pdf'

const template = 'any_template'
const makeSut = (): TemplateHtmlAdapter => new TemplateHtmlAdapter(template)

const renderStub = jest.fn().mockImplementation(() => 'any_html')

jest.mock('email-templates', () => jest.fn().mockImplementation(() => {
  return {
    render: renderStub
  }
}))

const toStreamStub = jest.fn().mockImplementation(() => 'any_stream')

jest.mock('html-pdf', () => ({
  create: jest.fn().mockImplementation(() => {
    return {
      toStream: toStreamStub
    }
  })
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

  test('Should create html-pdf with correct values', async () => {
    const sut = makeSut()
    await sut.convert('any_message')
    expect(pdf.create).toHaveBeenCalledWith('any_html', {
      height: '1123px',
      width: '794px',
      quality: '75'
    })
  })

  test('Should create html-pdf with correct values', async () => {
    const sut = makeSut()
    await sut.convert('any_message')
    expect(pdf.create).toHaveBeenCalledWith('any_html', {
      height: '1123px',
      width: '794px',
      quality: '75'
    })
  })

  test('Should call toStream', async () => {
    const sut = makeSut()
    await sut.convert('any_message')
    expect(toStreamStub).toHaveBeenCalled()
  })

  test('Should return stream on success', async () => {
    const sut = makeSut()
    const result = await sut.convert('any_message')
    expect(result).toBe('any_stream')
  })
})

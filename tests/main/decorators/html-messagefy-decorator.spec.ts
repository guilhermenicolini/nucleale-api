import { HtmlMessagefyDecorator } from '@/main/decorators'
import { MessagefySpy } from '@/tests/data/mocks'
import Templates from 'email-templates'

const template = 'any_template'

type SutTypes = {
  sut: HtmlMessagefyDecorator
  messagefySpy: MessagefySpy
}

const makeSut = (): SutTypes => {
  const messagefySpy = new MessagefySpy()
  const sut = new HtmlMessagefyDecorator(template, messagefySpy)
  return {
    sut,
    messagefySpy
  }
}

const renderStub = jest.fn().mockImplementation(() => 'any_html')

jest.mock('email-templates', () => jest.fn().mockImplementation(() => {
  return {
    render: renderStub
  }
}))

describe('HtmlMessagefy Decorator', () => {
  test('Should init email-templates with correct values', async () => {
    const { sut } = makeSut()
    await sut.create('any_message')
    expect(Templates).toHaveBeenCalledWith({
      views: {
        root: 'templates'
      }
    })
  })

  test('Should call render correct values', async () => {
    const { sut } = makeSut()
    await sut.create('any_message')
    expect(renderStub).toHaveBeenCalledWith(template, 'any_message')
  })

  test('Should return html on success', async () => {
    const { sut } = makeSut()
    const result = await sut.create('any_message')
    expect(result.html).toBe('any_html')
  })
})

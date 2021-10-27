import { HtmlMessagefyDecorator } from '@/main/decorators'
import { MessagefySpy } from '@/tests/data/mocks'
import Templates from 'email-templates'

const template = 'any_template'

const mockData = () => ({
  subject: 'any_subject'
})

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
    await sut.create(mockData())
    expect(Templates).toHaveBeenCalledWith({
      views: {
        root: 'templates'
      }
    })
  })

  test('Should call render correct values', async () => {
    const { sut } = makeSut()
    const data = mockData()
    await sut.create(data)
    expect(renderStub).toHaveBeenCalledWith(template, data)
  })

  test('Should call render with message subject', async () => {
    const { sut, messagefySpy } = makeSut()
    messagefySpy.result.subject = 'changed_subject'
    await sut.create(mockData())
    expect(renderStub).toHaveBeenCalledWith(template, { subject: 'changed_subject' })
  })

  test('Should return html on success', async () => {
    const { sut } = makeSut()
    const data = mockData()
    const result = await sut.create(data)
    expect(result.html).toBe('any_html')
  })
})

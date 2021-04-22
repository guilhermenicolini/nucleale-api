import { XmlConverterAdapter } from '@/infra/cryptography'

const endStub = jest.fn().mockImplementation(() => 'xml_converted')

jest.mock('xmlbuilder2', () => {
  return {
    create: jest.fn().mockImplementation(() => {
      return {
        end: endStub
      }
    })
  }
})

const makeSut = (): XmlConverterAdapter => {
  return new XmlConverterAdapter('any_encoding')
}

describe('XmlConverter Adapter', () => {
  test('Should call builder with correct values', async () => {
    const sut = makeSut()
    const result = await sut.convert('any_xml')
    expect(result).toBe('xml_converted')
  })
})

import { XmlConverterAdapter } from '@/infra/cryptography'

import builder from 'xmlbuilder2'

const endStub = jest.fn().mockImplementation(() => 'xml_converted')
const createStub = jest.fn().mockImplementation(() => {
  return {
    end: endStub
  }
})

jest.mock('xmlbuilder2', () => jest.fn())

const makeSut = (): XmlConverterAdapter => {
  return new XmlConverterAdapter('any_encoding')
}

describe('XmlConverter Adapter', () => {
  beforeAll(() => {
    builder.create = createStub
  })

  describe('builder()', () => {
    test('Should call builder with correct values', async () => {
      const sut = makeSut()
      await sut.convert('any_xml')
      expect(builder.create).toHaveBeenCalledWith('any_xml', { encoding: 'any_encoding' })
    })

    test('Should return converted xml on success', async () => {
      const sut = makeSut()
      const result = await sut.convert('any_xml')
      expect(result).toBe('xml_converted')
    })
  })
})

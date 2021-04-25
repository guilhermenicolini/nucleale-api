import { XmlConverterAdapter } from '@/infra/cryptography'

import builder, { convert } from 'xmlbuilder2'

jest.mock('xmlbuilder2', () => ({
  convert: jest.fn().mockImplementation(() => ({ obj: true })),
  create: jest.fn().mockImplementation(() => {
    return {
      end: jest.fn().mockImplementation(() => 'xml_converted')
    }
  })
}))

const makeSut = (): XmlConverterAdapter => {
  return new XmlConverterAdapter('any_encoding')
}

describe('XmlConverter Adapter', () => {
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

  describe('convert()', () => {
    test('Should call convert with correct values', async () => {
      const sut = makeSut()
      await sut.decrypt('any_xml')
      expect(convert).toHaveBeenCalledWith('any_xml', { format: 'object' })
    })

    test('Should return object on success', async () => {
      const sut = makeSut()
      const result = await sut.decrypt('any_xml')
      expect(result).toEqual({ obj: true })
    })
  })
})

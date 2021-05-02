import { NfsePersonTransformer } from '@/infra/transformers'
import { mockNfse } from '@/tests/infra/mocks'
import { MaskManipulatorSpy } from '@/tests/data/mocks'

const makeSutTaker = (): NfsePersonTransformer => new NfsePersonTransformer('taker', 'TOMADOR', null, new MaskManipulatorSpy())
const makeSutProvider = (): NfsePersonTransformer => new NfsePersonTransformer('provider', 'PRESTADOR', 'PREST', new MaskManipulatorSpy())

describe('NfsePerson Transformer', () => {
  describe('taker', () => {
    test('Should return invoice person model on success', () => {
      const sut = makeSutTaker()
      const data = mockNfse()
      const result = sut.transform(data)
      expect(result.taker).toBeTruthy()
    })

    test('Should return invoice person model without optional props', () => {
      const sut = makeSutTaker()
      const data = mockNfse()
      data.TOMADOR_TIPO_LOGRADOURO = null
      data.TOMADOR_COMPLEMENTO = null
      data.TOMADOR_TELEFONE = '34567890'
      const result = sut.transform(data)
      expect(result.taker).toBeTruthy()
    })
  })

  describe('provider', () => {
    test('Should return invoice person model on success', () => {
      const sut = makeSutProvider()
      const data = mockNfse()
      const result = sut.transform(data)
      expect(result.provider).toBeTruthy()
    })

    test('Should return invoice person model without optional props', () => {
      const sut = makeSutProvider()
      const data = mockNfse()
      data.PRESTADOR_TIPO_LOGRADOURO = null
      data.PRESTADOR_COMPLEMENTO = null
      const result = sut.transform(data)
      expect(result.provider).toBeTruthy()
    })
  })
})

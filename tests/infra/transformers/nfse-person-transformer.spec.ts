import { NfsePersonTransformer } from '@/infra/transformers'
import { mockNfseItem } from '@/tests/infra/mocks'

const makeSutTaker = (): NfsePersonTransformer => new NfsePersonTransformer('taker', 'TOMADOR')
const makeSutProvider = (): NfsePersonTransformer => new NfsePersonTransformer('provider', 'PRESTADOR', 'PREST')

describe('NfsePerson Transformer', () => {
  describe('taker', () => {
    test('Should return invoice person model on success', () => {
      const sut = makeSutTaker()
      const data = mockNfseItem()
      const result = sut.transform(data)
      expect(result.taker).toBeTruthy()
    })

    test('Should return invoice person model without optional props', () => {
      const sut = makeSutTaker()
      const data = mockNfseItem()
      data.TOMADOR_TIPO_LOGRADOURO = null
      data.TOMADOR_COMPLEMENTO = null
      const result = sut.transform(data)
      expect(result.taker).toBeTruthy()
    })
  })

  describe('provider', () => {
    test('Should return invoice person model on success', () => {
      const sut = makeSutProvider()
      const data = mockNfseItem()
      const result = sut.transform(data)
      expect(result.provider).toBeTruthy()
    })

    test('Should return invoice person model without optional props', () => {
      const sut = makeSutProvider()
      const data = mockNfseItem()
      data.PRESTADOR_TIPO_LOGRADOURO = null
      data.PRESTADOR_COMPLEMENTO = null
      const result = sut.transform(data)
      expect(result.provider).toBeTruthy()
    })
  })
})

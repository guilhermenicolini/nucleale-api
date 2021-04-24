import { NfsePersonTransformer } from '@/infra/transformers'
import { mockNfseItem } from '@/tests/infra/mocks'

const makeSutTaker = (): NfsePersonTransformer => new NfsePersonTransformer('taker', 'TOMADOR')

describe('NfsePerson Transformer', () => {
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

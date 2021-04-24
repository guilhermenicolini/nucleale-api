import { NfseItemsTransformer } from '@/infra/transformers'
import { mockNfse } from '@/tests/infra/mocks'

const makeSut = (): NfseItemsTransformer => new NfseItemsTransformer()

describe('NfseItem Transformer', () => {
  test('Should return invoice items on success', () => {
    const sut = makeSut()
    const data = mockNfse()
    const result = sut.transform(data)
    expect(result.items).toBeTruthy()
  })
})

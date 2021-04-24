import { NfseItemsTransformer } from '@/infra/transformers'
import { mockNfseItem } from '@/tests/infra/mocks'

const makeSut = (): NfseItemsTransformer => new NfseItemsTransformer()

describe('NfseItem Transformer', () => {
  test('Should return invoice item models on success', () => {
    const sut = makeSut()
    const data = mockNfseItem()
    const result = sut.transform(data)
    expect(result.items).toBeTruthy()
  })
})

import { NfseItemsTransformer } from '@/infra/transformers'
import { mockNfse, mockNFseItem } from '@/tests/infra/mocks'

const makeSut = (): NfseItemsTransformer => new NfseItemsTransformer()

describe('NfseItem Transformer', () => {
  test('Should return invoice items on success', () => {
    const sut = makeSut()
    const data = mockNfse()
    const result = sut.transform(data)
    expect(result.items.length).toBe(2)
  })

  test('Should return invoice item on success', () => {
    const sut = makeSut()
    const data = mockNfse()
    data.ITENS = { ITEM: mockNFseItem() }
    const result = sut.transform(data)
    expect(result.items.length).toBe(1)
  })
})

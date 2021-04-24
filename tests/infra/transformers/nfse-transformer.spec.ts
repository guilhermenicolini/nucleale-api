import { NfseTransformer } from '@/infra/transformers'
import { mockNfseItem } from '@/tests/infra/mocks'

const makeSut = (): NfseTransformer => new NfseTransformer()

describe('Nfse Transformer', () => {
  test('Should return invoice model on success', () => {
    const sut = makeSut()
    const data = mockNfseItem()
    const result = sut.transform(data)
    expect(result).toBeTruthy()
  })
})

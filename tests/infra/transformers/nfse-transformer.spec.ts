import { NfseTransformer } from '@/infra/transformers'
import { mockNfse } from '@/tests/infra/mocks'
import { TimeManipulatorSpy } from '@/tests/data/mocks'

const makeSut = (): NfseTransformer => new NfseTransformer(new TimeManipulatorSpy())

describe('Nfse Transformer', () => {
  test('Should return invoice model on success', () => {
    const sut = makeSut()
    const data = mockNfse()
    const result = sut.transform(data)
    expect(result).toBeTruthy()
  })

  test('Should return invoice model on alternative values', () => {
    const sut = makeSut()
    const data = mockNfse()
    data.DESCRICAO_NOTA = null
    data.RPS_NUM = null
    const result = sut.transform(data)
    expect(result).toBeTruthy()
  })
})

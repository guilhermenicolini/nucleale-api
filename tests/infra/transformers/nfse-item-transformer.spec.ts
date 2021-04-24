import { NfseItemTransformer } from '@/infra/transformers'
import { mockNfseItem } from '@/tests/infra/mocks'

const makeSut = (): NfseItemTransformer => new NfseItemTransformer()

describe('NfseItem Transformer', () => {
  test('Should return invoice model on success', () => {
    const sut = makeSut()
    const data = mockNfseItem()
    const result = sut.transform(data)
    expect(result).toEqual({
      invoiceNo: result.invoiceNo,
      invoiceDate: result.invoiceDate,
      issueDate: result.issueDate,
      verificationCode: result.verificationCode,
      description: result.description,
      invoiceValue: result.invoiceValue,
      serviceValue: result.serviceValue,
      issValue: result.issValue,
      issAliquot: result.issAliquot,
      competence: result.competence,
      pickupType: result.pickupType,
      taxation: result.taxation,
      cnae: result.cnae,
      activity: result.activity,
      service: result.service,
      serviceCity: result.serviceCity,
      serviceState: result.serviceState
    })
  })
})

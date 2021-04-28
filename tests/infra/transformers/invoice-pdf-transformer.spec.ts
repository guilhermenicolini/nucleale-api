import { InvoicePdfTransformer } from '@/infra/transformers'
import { mockInvoiceDb } from '@/tests/domain/mocks'
import { TimeManipulatorSpy, MoneyManipulatorSpy, MaskManipulatorSpy } from '@/tests/data/mocks'

const makeSut = (): InvoicePdfTransformer => new InvoicePdfTransformer(
  new TimeManipulatorSpy(),
  new MoneyManipulatorSpy(),
  new MaskManipulatorSpy()
)

describe('InvoicePdf Transformer', () => {
  test('Should return message on success', () => {
    const sut = makeSut()
    const data = mockInvoiceDb()
    const result = sut.transform(data)
    expect(result).toBeTruthy()
  })

  test('Should return message alternative values on success', () => {
    const sut = makeSut()
    const data = mockInvoiceDb()
    data.items[0].taxable = true
    data.items[1].taxable = false
    data.issAliquot = 0
    data.pickupType = 'B'
    data.issueDate = 1618876800000
    const result = sut.transform(data)
    expect(result).toBeTruthy()
  })
})

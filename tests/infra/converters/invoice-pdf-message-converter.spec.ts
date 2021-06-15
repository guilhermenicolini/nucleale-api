import { InvoicePdfMessageConverter } from '@/infra/converters'
import { mockInvoiceDb } from '@/tests/domain/mocks'
import { TimeManipulatorSpy, MoneyManipulatorSpy, MaskManipulatorSpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: InvoicePdfMessageConverter,
  timeManipulatorSpy: TimeManipulatorSpy,
  moneyManipulatorSpy: MoneyManipulatorSpy,
  maskManipulatorSpy: MaskManipulatorSpy
}

const makeSut = (): SutTypes => {
  const timeManipulatorSpy = new TimeManipulatorSpy()
  const moneyManipulatorSpy = new MoneyManipulatorSpy()
  const maskManipulatorSpy = new MaskManipulatorSpy()
  const sut = new InvoicePdfMessageConverter(
    timeManipulatorSpy,
    moneyManipulatorSpy,
    maskManipulatorSpy
  )
  return {
    sut,
    timeManipulatorSpy,
    moneyManipulatorSpy,
    maskManipulatorSpy
  }
}

describe('InvoicePdfMessage Converter', () => {
  test('Should return message on success', () => {
    const { sut, timeManipulatorSpy } = makeSut()
    const data = mockInvoiceDb()
    jest.spyOn(timeManipulatorSpy, 'toDay').mockImplementationOnce(() => 'any_date2')
    const result = sut.convert(data)
    expect(result).toBeTruthy()
  })

  test('Should return message alternative values on success', () => {
    const { sut } = makeSut()
    const data = mockInvoiceDb()
    data.taker.phone = '+551934567890'
    data.taker.address.complement = null
    data.items[0].taxable = true
    data.items[1].taxable = false
    data.issAliquot = 0
    data.pickupType = 'B'
    data.issueDate = 1618876800000
    const result = sut.convert(data)
    expect(result).toBeTruthy()
  })
})

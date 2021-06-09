import { InvoiceToRpsConverter } from '@/infra/converters'
import { mockInvoice } from '@/tests/domain/mocks'
import { TimeManipulatorSpy, PhoneManipulatorSpy, HasherInvoiceSpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: InvoiceToRpsConverter,
  timeManipulatorSpy: TimeManipulatorSpy,
  phoneManipulatorSpy: PhoneManipulatorSpy,
  hasherSpy: HasherInvoiceSpy
}

const makeSut = (): SutTypes => {
  const timeManipulatorSpy = new TimeManipulatorSpy()
  const phoneManipulatorSpy = new PhoneManipulatorSpy()
  const hasherSpy = new HasherInvoiceSpy()
  const sut = new InvoiceToRpsConverter(
    timeManipulatorSpy,
    phoneManipulatorSpy,
    hasherSpy
  )
  return {
    sut,
    timeManipulatorSpy,
    phoneManipulatorSpy,
    hasherSpy
  }
}

describe('InvoiceToRps Converter', () => {
  test('Should return rps on success', () => {
    const { sut } = makeSut()
    const result = sut.convert(mockInvoice())
    expect(result).toBeTruthy()
  })

  test('Should return rps alternative values on success', () => {
    const { sut } = makeSut()
    const input = mockInvoice()
    input.taker.registryId = null
    input.items[0].taxable = false
    const result = sut.convert(input)
    expect(result).toBeTruthy()
  })
})

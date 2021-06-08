import { ModelsToInvoiceConverter } from '@/infra/converters'
import { mockAccountModel, mockAddressModel, mockCompanyModel, mockProcedureWithService } from '@/tests/domain/mocks'
import { StringManipulatorSpy, TimeManipulatorSpy } from '@/tests/data/mocks'

import faker from 'faker'

const mockInput = (): ModelsToInvoiceConverter.Input => ({
  account: mockAccountModel(),
  address: mockAddressModel(),
  company: mockCompanyModel(),
  procedure: mockProcedureWithService(),
  rpsNumber: faker.datatype.number(),
  amount: faker.datatype.float(),
  data: faker.random.word()
})

type SutTypes = {
  sut: ModelsToInvoiceConverter,
  stringManipulatorSpy: StringManipulatorSpy,
  timeManipulatorSpy: TimeManipulatorSpy
}

const makeSut = (): SutTypes => {
  const stringManipulatorSpy = new StringManipulatorSpy()
  const timeManipulatorSpy = new TimeManipulatorSpy()
  const sut = new ModelsToInvoiceConverter(
    stringManipulatorSpy,
    timeManipulatorSpy
  )
  return {
    sut,
    stringManipulatorSpy,
    timeManipulatorSpy
  }
}

describe('ModelsToInvoice Converter', () => {
  test('Should return invoice on success', () => {
    const { sut } = makeSut()
    const result = sut.convert(mockInput())
    expect(result).toBeTruthy()
  })

  test('Should return invoice alternative values on success', () => {
    const { sut } = makeSut()
    const input = mockInput()
    input.company.address.complement = null
    input.address.complement = null
    const result = sut.convert(input)
    expect(result).toBeTruthy()
  })
})

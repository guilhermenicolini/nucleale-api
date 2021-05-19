import { CreateInvoiceController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/presentation/mocks'

import { ObjectId } from 'mongodb'

const mockRequest = (): CreateInvoiceController.Request => ({
  user: new ObjectId().toString(),
  procedure: new ObjectId().toString(),
  amount: 300,
  data: 'any_data'
})

type SutTypes = {
  sut: CreateInvoiceController,
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new CreateInvoiceController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('CreateInvoice Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})

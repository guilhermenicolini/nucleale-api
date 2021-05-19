import { CreateInvoiceController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { badRequest } from '@/presentation/helpers'

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

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})

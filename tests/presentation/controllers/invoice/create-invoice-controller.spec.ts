import { CreateInvoiceController } from '@/presentation/controllers'
import { ValidationSpy, CreateInvoiceSpy } from '@/tests/presentation/mocks'
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
  validationSpy: ValidationSpy,
  createInvoiceSpy: CreateInvoiceSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const createInvoiceSpy = new CreateInvoiceSpy()
  const sut = new CreateInvoiceController(validationSpy, createInvoiceSpy)
  return {
    sut,
    validationSpy,
    createInvoiceSpy
  }
}

describe('CreateInvoice Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual({
      userId: request.user,
      procedureId: request.procedure,
      amount: request.amount,
      data: request.data
    })
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call CreateInvoice with correct values', async () => {
    const { sut, createInvoiceSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(createInvoiceSpy.params).toEqual({
      userId: request.user,
      procedureId: request.procedure,
      amount: request.amount,
      data: request.data
    })
  })
})

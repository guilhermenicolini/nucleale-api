import { CreateInvoiceController } from '@/presentation/controllers'
import {
  ValidationSpy,
  CreateInvoiceSpy,
  SendInvoiceSpy,
  SaveInvoiceSpy,
  GenerateInvoiceSpy
} from '@/tests/presentation/mocks'
import { badRequest, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { ServerError } from '@/presentation/errors'

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
  createInvoiceSpy: CreateInvoiceSpy,
  sendInvoiceSpy: SendInvoiceSpy,
  saveInvoiceSpy: SaveInvoiceSpy,
  generateInvoiceSpy: GenerateInvoiceSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const createInvoiceSpy = new CreateInvoiceSpy()
  const sendInvoiceSpy = new SendInvoiceSpy()
  const saveInvoiceSpy = new SaveInvoiceSpy()
  const generateInvoiceSpy = new GenerateInvoiceSpy()
  const sut = new CreateInvoiceController(
    validationSpy,
    createInvoiceSpy,
    sendInvoiceSpy,
    saveInvoiceSpy,
    generateInvoiceSpy)
  return {
    sut,
    validationSpy,
    createInvoiceSpy,
    sendInvoiceSpy,
    saveInvoiceSpy,
    generateInvoiceSpy
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

  test('Should return 500 if CreateInvoice throws', async () => {
    const { sut, createInvoiceSpy } = makeSut()
    jest.spyOn(createInvoiceSpy, 'create').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 400 if CreateInvoice returns an error', async () => {
    const { sut, createInvoiceSpy } = makeSut()
    createInvoiceSpy.result = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(createInvoiceSpy.result))
  })

  test('Should call SendInvoice with correct values', async () => {
    const { sut, createInvoiceSpy, sendInvoiceSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(sendInvoiceSpy.params).toEqual(createInvoiceSpy.result)
  })

  test('Should return 500 if SendInvoice throws', async () => {
    const { sut, sendInvoiceSpy } = makeSut()
    jest.spyOn(sendInvoiceSpy, 'send').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 400 if SendInvoice returns an error', async () => {
    const { sut, sendInvoiceSpy } = makeSut()
    sendInvoiceSpy.result = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(sendInvoiceSpy.result))
  })

  test('Should call SaveInvoice with correct values', async () => {
    const { sut, createInvoiceSpy, sendInvoiceSpy, saveInvoiceSpy } = makeSut()
    await sut.handle(mockRequest())
    const sendResult = sendInvoiceSpy.result as any
    expect(saveInvoiceSpy.param.invoiceNo).toBe(sendResult.invoiceNo)
    expect(saveInvoiceSpy.param.verificationCode).toBe(sendResult.verificationCode)
    expect(saveInvoiceSpy.param).toEqual(createInvoiceSpy.result)
  })

  test('Should return 500 if SaveInvoice throws', async () => {
    const { sut, saveInvoiceSpy } = makeSut()
    jest.spyOn(saveInvoiceSpy, 'save').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call GenerateInvoice with correct values', async () => {
    const { sut, createInvoiceSpy, generateInvoiceSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(generateInvoiceSpy.model).toEqual(createInvoiceSpy.result)
  })

  test('Should return 500 if GenerateInvoice throws', async () => {
    const { sut, generateInvoiceSpy } = makeSut()
    jest.spyOn(generateInvoiceSpy, 'generate').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})

import { ResendInvoiceController } from '@/presentation/controllers'
import { ValidationSpy, LoadAccountByEmailSpy, LoadInvoiceByNumberSpy, GenerateInvoiceSpy, MailInvoiceSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { badRequest, serverError, notFound, noContent } from '@/presentation/helpers'
import { ServerError, RecordNotFoundError } from '@/presentation/errors'

import faker from 'faker'

const mockRequest = () => ({
  invoiceNo: faker.datatype.number().toString()
})

type SutTypes = {
  sut: ResendInvoiceController,
  validationSpy: ValidationSpy,
  loadAccountByEmailSpy: LoadAccountByEmailSpy,
  loadInvoiceByNumberSpy: LoadInvoiceByNumberSpy,
  generateInvoiceSpy: GenerateInvoiceSpy,
  mailInvoiceSpy: MailInvoiceSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadAccountByEmailSpy = new LoadAccountByEmailSpy()
  const loadInvoiceByNumberSpy = new LoadInvoiceByNumberSpy()
  const generateInvoiceSpy = new GenerateInvoiceSpy()
  const mailInvoiceSpy = new MailInvoiceSpy()

  const sut = new ResendInvoiceController(validationSpy, loadAccountByEmailSpy, loadInvoiceByNumberSpy, generateInvoiceSpy, mailInvoiceSpy)
  return {
    sut,
    validationSpy,
    loadAccountByEmailSpy,
    loadInvoiceByNumberSpy,
    generateInvoiceSpy,
    mailInvoiceSpy
  }
}

describe('ResendInvoice Controller', () => {
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

  test('Should call LoadInvoiceByNumber with correct values', async () => {
    const { sut, loadInvoiceByNumberSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadInvoiceByNumberSpy.invoiceNo).toBe(parseInt(request.invoiceNo))
  })

  test('Should return 500 if LoadInvoiceByNumber throws', async () => {
    const { sut, loadInvoiceByNumberSpy } = makeSut()
    jest.spyOn(loadInvoiceByNumberSpy, 'loadByNumber').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404 if LoadInvoiceByNumber returns null', async () => {
    const { sut, loadInvoiceByNumberSpy } = makeSut()
    loadInvoiceByNumberSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound(new RecordNotFoundError('Nota fiscal não encontrada')))
  })

  test('Should call LoadAccountByEmail with correct values', async () => {
    const { sut, loadInvoiceByNumberSpy, loadAccountByEmailSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAccountByEmailSpy.email).toBe(loadInvoiceByNumberSpy.result.taker.email)
  })

  test('Should return 404 if LoadAccountByEmail returns null', async () => {
    const { sut, loadAccountByEmailSpy } = makeSut()
    loadAccountByEmailSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound(new RecordNotFoundError('Conta não encontrada')))
  })

  test('Should return 500 if LoadAccountByEmail throws', async () => {
    const { sut, loadAccountByEmailSpy } = makeSut()
    jest.spyOn(loadAccountByEmailSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call GenerateInvoice with correct values', async () => {
    const { sut, loadInvoiceByNumberSpy, generateInvoiceSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(generateInvoiceSpy.model).toEqual(loadInvoiceByNumberSpy.result)
  })

  test('Should return 500 if GenerateInvoice throws', async () => {
    const { sut, generateInvoiceSpy } = makeSut()
    jest.spyOn(generateInvoiceSpy, 'generate').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call MailInvoice with correct values', async () => {
    const { sut, loadAccountByEmailSpy, loadInvoiceByNumberSpy, generateInvoiceSpy, mailInvoiceSpy } = makeSut()
    const taker = {
      email: loadAccountByEmailSpy.result.email,
      phone: loadAccountByEmailSpy.result.mobilePhone,
      name: loadAccountByEmailSpy.result.name.split(' ')[0],
      taxId: null,
      registryId: null,
      address: null
    }
    await sut.handle(mockRequest())
    expect(mailInvoiceSpy.param).toEqual({
      to: taker,
      invoiceNo: loadInvoiceByNumberSpy.result.invoiceNo,
      pdf: generateInvoiceSpy.result.buffer
    })
  })

  test('Should return 500 if MailInvoice throws', async () => {
    const { sut, mailInvoiceSpy } = makeSut()
    jest.spyOn(mailInvoiceSpy, 'send').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})

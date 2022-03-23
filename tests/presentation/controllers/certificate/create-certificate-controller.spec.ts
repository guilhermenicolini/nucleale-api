import { CreateCertificateController } from '@/presentation/controllers'
import {
  ValidationSpy,
  LoadAccountSpy,
  CreateCertificateSpy,
  GenerateCertificateSpy,
  SendCertificateSpy
} from '@/tests/presentation/mocks'
import { badRequest, noContent } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { CertificateType } from '@/domain/models'

import { ObjectId } from 'mongodb'

const mockRequest = (): CreateCertificateController.Request => ({
  user: new ObjectId().toString(),
  procedure: new ObjectId().toString(),
  type: CertificateType.online,
  date: 1647982564066
})

type SutTypes = {
  sut: CreateCertificateController,
  validationSpy: ValidationSpy
  loadAccountSpy: LoadAccountSpy,
  createCertificateSpy: CreateCertificateSpy,
  generateCertificateSpy: GenerateCertificateSpy,
  sendCertificateSpy: SendCertificateSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadAccountSpy = new LoadAccountSpy()
  const createCertificateSpy = new CreateCertificateSpy()
  const generateCertificateSpy = new GenerateCertificateSpy()
  const sendCertificateSpy = new SendCertificateSpy()
  const sut = new CreateCertificateController(
    validationSpy,
    loadAccountSpy,
    createCertificateSpy,
    generateCertificateSpy,
    sendCertificateSpy)
  return {
    sut,
    validationSpy,
    loadAccountSpy,
    createCertificateSpy,
    generateCertificateSpy,
    sendCertificateSpy
  }
}

describe('CreateCertificate Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual({
      userId: request.user,
      procedureId: request.procedure,
      type: request.type,
      date: request.date
    })
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call LoadAccount with correct values', async () => {
    const { sut, loadAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAccountSpy.userId).toBe(request.user)
  })

  test('Should return error if LoadAccount throws', async () => {
    const { sut, loadAccountSpy } = makeSut()
    jest.spyOn(loadAccountSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).not.toBe(204)
  })

  test('Should call CreateCertificate with correct values', async () => {
    const { sut, createCertificateSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(createCertificateSpy.params).toEqual({
      userId: request.user,
      procedureId: request.procedure,
      type: request.type,
      date: request.date
    })
  })

  test('Should return error if CreateCertificate throws', async () => {
    const { sut, createCertificateSpy } = makeSut()
    jest.spyOn(createCertificateSpy, 'create').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).not.toBe(204)
  })

  test('Should call GenerateCertificate with correct values', async () => {
    const { sut, createCertificateSpy, generateCertificateSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(generateCertificateSpy.data).toEqual(createCertificateSpy.result)
  })

  test('Should return error if GenerateCertificate throws', async () => {
    const { sut, generateCertificateSpy } = makeSut()
    jest.spyOn(generateCertificateSpy, 'generate').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).not.toBe(204)
  })

  test('Should call SendCertificate with correct values', async () => {
    const { sut, loadAccountSpy, generateCertificateSpy, sendCertificateSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(sendCertificateSpy.model).toEqual({
      email: loadAccountSpy.result.email,
      name: loadAccountSpy.result.name,
      phone: loadAccountSpy.result.mobilePhone,
      file: generateCertificateSpy.result
    })
  })

  test('Should return error if SendCertificate throws', async () => {
    const { sut, sendCertificateSpy } = makeSut()
    jest.spyOn(sendCertificateSpy, 'send').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).not.toBe(204)
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})

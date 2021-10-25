import { CreateCertificateController } from '@/presentation/controllers'
import {
  ValidationSpy,
  CreateCertificateSpy
} from '@/tests/presentation/mocks'
import { badRequest, noContent } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { CertificateType } from '@/domain/models'

import { ObjectId } from 'mongodb'
import faker from 'faker'

const mockRequest = (): CreateCertificateController.Request => ({
  user: new ObjectId().toString(),
  procedure: new ObjectId().toString(),
  type: faker.random.arrayElement(Object.values(CertificateType)),
  date: faker.date.recent().valueOf()
})

type SutTypes = {
  sut: CreateCertificateController,
  validationSpy: ValidationSpy
  createCertificateSpy: CreateCertificateSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const createCertificateSpy = new CreateCertificateSpy()
  const sut = new CreateCertificateController(
    validationSpy,
    createCertificateSpy)
  return {
    sut,
    validationSpy,
    createCertificateSpy
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

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})

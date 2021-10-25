import { CreateCertificateController } from '@/presentation/controllers'
import {
  ValidationSpy,
  LoadAccountSpy
} from '@/tests/presentation/mocks'
import { badRequest, notFound, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { RecordNotFoundError, ServerError } from '@/presentation/errors'

import { ObjectId } from 'mongodb'
import faker from 'faker'

const mockRequest = (): CreateCertificateController.Request => ({
  user: new ObjectId().toString(),
  procedure: new ObjectId().toString(),
  type: faker.random.arrayElement(['online', 'presencial']),
  date: faker.date.recent().valueOf()
})

type SutTypes = {
  sut: CreateCertificateController,
  validationSpy: ValidationSpy
  loadAccountSpy: LoadAccountSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadAccountSpy = new LoadAccountSpy()
  const sut = new CreateCertificateController(
    validationSpy,
    loadAccountSpy, null, null, null, null)
  return {
    sut,
    validationSpy,
    loadAccountSpy
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

  test('Should return 404 if LoadAccount returns null', async () => {
    const { sut, loadAccountSpy } = makeSut()
    loadAccountSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound(new RecordNotFoundError('Conta não encontrada')))
  })

  test('Should return 500 if LoadAccount throws', async () => {
    const { sut, loadAccountSpy } = makeSut()
    jest.spyOn(loadAccountSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})

import { InviteAccountController } from '@/presentation/controllers'
import { InviteAccountSpy, ValidationSpy, LoadAccountSpy } from '@/tests/presentation/mocks'
import { badRequest, serverError, noContent, notFound } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { ServerError, EmailInUseError, RecordNotFoundError } from '@/presentation/errors'

import { ObjectId } from 'mongodb'
import faker from 'faker'
import { MessagefySpy, SenderSpy } from '@/tests/data/mocks'
import env from '@/main/config/env'

const mockRequest = (): InviteAccountController.Request => {
  return {
    userId: new ObjectId().toString(),
    accountId: new ObjectId().toString(),
    email: faker.internet.email()
  }
}

type SutTypes = {
  sut: InviteAccountController,
  validationSpy: ValidationSpy,
  loadAccountSpy: LoadAccountSpy
  inviteAccountSpy: InviteAccountSpy,
  messagefySpy: MessagefySpy
  senderSpy: SenderSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const inviteAccountSpy = new InviteAccountSpy()
  const loadAccountSpy = new LoadAccountSpy()
  const messagefySpy = new MessagefySpy()
  const senderSpy = new SenderSpy()
  const sut = new InviteAccountController(validationSpy, loadAccountSpy, inviteAccountSpy, messagefySpy, senderSpy)
  return {
    sut,
    validationSpy,
    loadAccountSpy,
    inviteAccountSpy,
    messagefySpy,
    senderSpy
  }
}

describe('ApproveAccount Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error ', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call LoadAccount with correct values', async () => {
    const { sut, loadAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAccountSpy.userId).toBe(request.userId)
  })

  test('Should return 500 if LoadAccount throws ', async () => {
    const { sut, loadAccountSpy } = makeSut()
    jest.spyOn(loadAccountSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404 if LoadAccount returns null', async () => {
    const { sut, loadAccountSpy } = makeSut()
    loadAccountSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound(new RecordNotFoundError('Conta não encontrada')))
  })

  test('Should call InviteAccount with correct values', async () => {
    const { sut, inviteAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(inviteAccountSpy.accountId).toBe(request.accountId)
    expect(inviteAccountSpy.email).toBe(request.email)
  })

  test('Should return 500 if InviteAccount throws ', async () => {
    const { sut, inviteAccountSpy } = makeSut()
    jest.spyOn(inviteAccountSpy, 'invite').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 400 if InviteAccount returns false ', async () => {
    const { sut, inviteAccountSpy } = makeSut()
    inviteAccountSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new EmailInUseError()))
  })

  test('Should call Messagefy with correct values', async () => {
    const { sut, loadAccountSpy, messagefySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(messagefySpy.data).toEqual({
      subject: `Convite de ${loadAccountSpy.result.name.split(' ')[0]}`,
      name: loadAccountSpy.result.name.split(' ')[0],
      email: request.email,
      url: `${env.appUrl}/sign-up`
    })
  })

  test('Should return 500 if Messagefy throws', async () => {
    const { sut, messagefySpy } = makeSut()
    jest.spyOn(messagefySpy, 'create').mockImplementation(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call Sender with correct values', async () => {
    const { sut, messagefySpy, senderSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(senderSpy.model).toEqual(messagefySpy.result)
  })

  test('Should return 500 if Sender throws', async () => {
    const { sut, senderSpy } = makeSut()
    jest.spyOn(senderSpy, 'send').mockImplementation(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})

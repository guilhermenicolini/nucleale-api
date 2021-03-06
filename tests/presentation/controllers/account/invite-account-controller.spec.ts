import { InviteAccountController } from '@/presentation/controllers'
import { InviteAccountSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { badRequest, serverError, noContent } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { ServerError, EmailInUseError } from '@/presentation/errors'

import { ObjectId } from 'mongodb'
import faker from 'faker'

const mockRequest = (): InviteAccountController.Request => {
  return {
    accountId: new ObjectId().toString(),
    email: faker.internet.email()
  }
}

type SutTypes = {
  sut: InviteAccountController,
  validationSpy: ValidationSpy,
  inviteAccountSpy: InviteAccountSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const inviteAccountSpy = new InviteAccountSpy()
  const sut = new InviteAccountController(validationSpy, inviteAccountSpy)
  return {
    sut,
    validationSpy,
    inviteAccountSpy
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

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})

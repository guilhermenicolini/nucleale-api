import { InviteAccountController } from '@/presentation/controllers'
import { InviteAccountSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { badRequest } from '@/presentation/helpers'

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
})

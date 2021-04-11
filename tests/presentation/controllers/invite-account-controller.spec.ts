import { InviteAccountController } from '@/presentation/controllers'
import { InviteAccountSpy, ValidationSpy } from '@/tests/presentation/mocks'
// import { throwError } from '@/tests/domain/mocks'
// import { serverError, noContent, badRequest } from '@/presentation/helpers'
// import { ServerError } from '@/presentation/errors'

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
})

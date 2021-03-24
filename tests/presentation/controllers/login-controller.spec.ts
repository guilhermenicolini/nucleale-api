import { LoginController } from '@/presentation/controllers'
import { VerifyAccountSpy, ValidationSpy, AuthenticationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): LoginController.Request => {
  const password = faker.internet.password(20)
  return {
    email: faker.internet.email(),
    password
  }
}

type SutTypes = {
  sut: LoginController,
  verifyAccountSpy: VerifyAccountSpy,
  validationSpy: ValidationSpy,
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const verifyAccountSpy = new VerifyAccountSpy()
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new LoginController(verifyAccountSpy, validationSpy, authenticationSpy)
  return {
    sut,
    verifyAccountSpy,
    validationSpy,
    authenticationSpy
  }
}

describe('SignUp Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})

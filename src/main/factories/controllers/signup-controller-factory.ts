import { makeDbAddAccount, makeSignUpValidation, makeTokenAuthentication } from '@/main/factories'
import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSignUpController = (): Controller => {
  return new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeTokenAuthentication())
}

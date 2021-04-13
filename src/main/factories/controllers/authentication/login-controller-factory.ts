import { makeDbVerifyAccount, makeLoginValidation, makeTokenAuthentication } from '@/main/factories'
import { LoginController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoginController = (): Controller => {
  return new LoginController(makeDbVerifyAccount(), makeLoginValidation(), makeTokenAuthentication())
}

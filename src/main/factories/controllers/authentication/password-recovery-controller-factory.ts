import {
  makePasswordRevoceryValidation,
  makeDbLoadAccountByEmail,
  makeDbGeneratePasswordRecoveryLink
} from '@/main/factories'
import { PasswordRecoveryController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makePasswordRecoveryController = (): Controller => {
  return new PasswordRecoveryController(
    makePasswordRevoceryValidation(),
    makeDbLoadAccountByEmail(),
    makeDbGeneratePasswordRecoveryLink()
  )
}

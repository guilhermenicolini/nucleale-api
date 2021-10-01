import {
  makeChangePasswordValidation,
  makeDbChangePassword
} from '@/main/factories'
import { ChangePasswordController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeChangePasswordController = (): Controller => {
  return new ChangePasswordController(
    makeChangePasswordValidation(),
    makeDbChangePassword())
}

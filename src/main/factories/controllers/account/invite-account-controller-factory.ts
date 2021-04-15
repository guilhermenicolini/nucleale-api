import {
  makeInviteAccountValidation,
  makeDbInviteAccount
} from '@/main/factories'
import { InviteAccountController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeInviteAccountController = (): Controller => {
  return new InviteAccountController(
    makeInviteAccountValidation(),
    makeDbInviteAccount())
}

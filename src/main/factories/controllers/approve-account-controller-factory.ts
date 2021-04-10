import {
  makeDbLoadAccount,
  makeDbSaveAccount
} from '@/main/factories'
import { ApproveAccountController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeApproveAccountController = (): Controller => {
  return new ApproveAccountController(
    makeDbLoadAccount(),
    makeDbSaveAccount())
}

import { makeDbLoadAccounts } from '@/main/factories'
import { LoadAccountsController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadAccountsController = (): Controller => {
  return new LoadAccountsController(makeDbLoadAccounts())
}

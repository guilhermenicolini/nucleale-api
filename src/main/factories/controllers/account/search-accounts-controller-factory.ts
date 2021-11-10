import { makeDbSearchAccounts } from '@/main/factories'
import { SearchAccountsController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSearchAccountsController = (): Controller => {
  return new SearchAccountsController(makeDbSearchAccounts())
}

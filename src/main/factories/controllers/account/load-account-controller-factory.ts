import { makeDbLoadAccount } from '@/main/factories'
import { LoadAccountController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadAccountController = (): Controller => {
  return new LoadAccountController(makeDbLoadAccount())
}

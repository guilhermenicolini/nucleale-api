import { makeDbLoadAccountsByStatus, makeLoadAccountsByStatusValidation } from '@/main/factories'
import { LoadAccountsByStatusController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadAccountsByStatusController = (): Controller => {
  return new LoadAccountsByStatusController(makeDbLoadAccountsByStatus(), makeLoadAccountsByStatusValidation())
}

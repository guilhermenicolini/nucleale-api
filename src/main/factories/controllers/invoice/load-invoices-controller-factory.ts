import {
  makeDbLoadInvoices
} from '@/main/factories'
import { LoadInvoicesController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadInvoicesController = (): Controller => {
  return new LoadInvoicesController(makeDbLoadInvoices())
}

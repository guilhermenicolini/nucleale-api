import {
  makeUploadInvoicesValidation,
  makeIoLoadInvoices,
  makeDbSaveInvoice
} from '@/main/factories'
import { UploadInvoicesController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUploadInvoicesController = (): Controller => {
  return new UploadInvoicesController(
    makeUploadInvoicesValidation(),
    makeIoLoadInvoices(),
    makeDbSaveInvoice())
}

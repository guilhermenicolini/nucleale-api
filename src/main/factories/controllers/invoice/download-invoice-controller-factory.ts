import {
  makeDownloadInvoiceValidation,
  makeDbLoadInvoice,
  makeIoGenerateInvoice
} from '@/main/factories'
import { DownloadInvoiceController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeDownloadInvoiceController = (): Controller => {
  return new DownloadInvoiceController(
    makeDownloadInvoiceValidation(),
    makeDbLoadInvoice(),
    makeIoGenerateInvoice()
  )
}

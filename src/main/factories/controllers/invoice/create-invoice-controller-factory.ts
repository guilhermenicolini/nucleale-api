import { CreateInvoiceController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import {
  makeCreateInvoiceValidation,
  makeDbLoadAccount,
  makeDbCreateInvoice,
  makeDbSaveInvoice,
  makeIoGenerateInvoice,
  makeRemoteSendInvoice,
  makeRemoteMailInvoice
} from '@/main/factories'

export const makeCreateInvoiceController = (): Controller => {
  return new CreateInvoiceController(
    makeCreateInvoiceValidation(),
    makeDbLoadAccount(),
    makeDbCreateInvoice(),
    makeRemoteSendInvoice(),
    makeDbSaveInvoice(),
    makeIoGenerateInvoice(),
    makeRemoteMailInvoice()
  )
}

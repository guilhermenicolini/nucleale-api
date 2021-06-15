import { CreateInvoiceController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import {
  makeDbCreateInvoice,
  makeCreateInvoiceValidation,
  makeDbSaveInvoice,
  makeIoGenerateInvoice,
  makeRemoteSendInvoice,
  makeRemoteMailInvoice
} from '@/main/factories'

export const makeCreateInvoiceController = (): Controller => {
  return new CreateInvoiceController(
    makeCreateInvoiceValidation(),
    makeDbCreateInvoice(),
    makeRemoteSendInvoice(),
    makeDbSaveInvoice(),
    makeIoGenerateInvoice(),
    makeRemoteMailInvoice()
  )
}

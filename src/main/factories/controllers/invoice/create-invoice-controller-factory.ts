import {
  makeDbCreateInvoice
} from '@/main/factories'
import { CreateInvoiceController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbSaveInvoice, makeIoGenerateInvoice, makeRemoteSendInvoice } from '../../usecases'
import { makeCreateInvoiceValidation } from './create-invoice-validation-factory'

export const makeCreateInvoiceController = (): Controller => {
  return new CreateInvoiceController(
    makeCreateInvoiceValidation(),
    makeDbCreateInvoice(),
    makeRemoteSendInvoice(),
    makeDbSaveInvoice(),
    makeIoGenerateInvoice(),
    null
  )
}

import {
  makeDbLoadAccountByEmail,
  makeResendInvoiceValidation,
  makeDbLoadInvoiceByNumber,
  makeIoGenerateInvoice
} from '@/main/factories'
import { ResendInvoiceController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeRemoteMailInvoice } from '../../usecases'

export const makeResendInvoiceController = (): Controller => {
  return new ResendInvoiceController(
    makeResendInvoiceValidation(),
    makeDbLoadAccountByEmail(),
    makeDbLoadInvoiceByNumber(),
    makeIoGenerateInvoice(),
    makeRemoteMailInvoice()
  )
}

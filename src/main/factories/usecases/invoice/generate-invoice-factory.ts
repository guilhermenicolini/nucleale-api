import { IoGenerateInvoice } from '@/data/usecases'
import { GenerateInvoice } from '@/domain/usecases'
import { makeInvoicePdfMessageConverter, makeHtmlPdfTransformer } from '@/main/factories'

export const makeIoGenerateInvoice = (): GenerateInvoice => {
  return new IoGenerateInvoice(makeInvoicePdfMessageConverter(), makeHtmlPdfTransformer())
}

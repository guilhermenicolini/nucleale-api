import { InvoicePdfMessageConverter } from '@/infra/converters'
import { ObjectConverter } from '@/data/protocols'
import { MomentAdapter, MoneyAdapter, StringMaskAdapter } from '@/infra/manipulation'
import { InvoiceModel } from '@/domain/models'

export const makeInvoicePdfMessageConverter = (): ObjectConverter<InvoiceModel, any> => {
  return new InvoicePdfMessageConverter(
    new MomentAdapter(),
    new MoneyAdapter(2, ','),
    new StringMaskAdapter())
}

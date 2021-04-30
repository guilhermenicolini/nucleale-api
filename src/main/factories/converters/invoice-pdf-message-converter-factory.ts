import { InvoicePdfMessageConverter } from '@/infra/converters'
import { Converter } from '@/data/protocols'
import { MomentAdapter, MoneyAdapter, StringMaskAdapter } from '@/infra/manipulation'

export const makeInvoicePdfMessageConverter = (): Converter => {
  return new InvoicePdfMessageConverter(
    new MomentAdapter(),
    new MoneyAdapter(2, ','),
    new StringMaskAdapter())
}

import { RemoteMailInvoice } from '@/data/usecases'
import { MailInvoice } from '@/domain/usecases'
import { WhatsappSender } from '@/infra/notification'
import { SendInvoiceMessage } from '@/infra/notification/send-invoice-message'

export const makeRemoteMailInvoice = (): MailInvoice => {
  return new RemoteMailInvoice(
    new SendInvoiceMessage(),
    new WhatsappSender()
  )
}

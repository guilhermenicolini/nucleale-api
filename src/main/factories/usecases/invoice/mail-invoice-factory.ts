import { RemoteMailInvoice } from '@/data/usecases'
import { MailInvoice } from '@/domain/usecases'
import { SendInvoiceMessage } from '@/infra/notification/send-invoice-message'
import { HtmlMessagefyDecorator } from '@/main/decorators'
import { makeSendNotifications } from '@/main/factories'

export const makeRemoteMailInvoice = (): MailInvoice => {
  return new RemoteMailInvoice(
    new HtmlMessagefyDecorator('mails/invoice/html', new SendInvoiceMessage()),
    makeSendNotifications()
  )
}

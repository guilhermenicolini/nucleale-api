import { RemoteSendCertificate } from '@/data/usecases'
import { SendCertificate } from '@/domain/usecases'
import { HtmlMessagefyDecorator } from '@/main/decorators'
import { SendCertificateMessage } from '@/infra/notification'
import { makeSendNotifications } from '@/main/factories'

export const makeRemoteSendCertificate = (): SendCertificate => {
  return new RemoteSendCertificate(
    new HtmlMessagefyDecorator('mails/certificate/html', new SendCertificateMessage()),
    makeSendNotifications()
  )
}

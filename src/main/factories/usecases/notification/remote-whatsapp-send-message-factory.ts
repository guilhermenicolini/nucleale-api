import { RemoteWhatsappSendMessage } from '@/data/usecases'
import { SendMessage } from '@/domain/usecases'
import { WhatsappSender } from '@/infra/notification'

export const makeRemoteWhatsappSendMessage = (): SendMessage => {
  return new RemoteWhatsappSendMessage(new WhatsappSender())
}

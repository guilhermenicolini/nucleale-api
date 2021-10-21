import {
  SenderComposite,
  WhatsappSender,
  GmailSender
} from '@/infra/notification'
import { Sender } from '@/data/protocols'

export const makeSendNotifications = (): SenderComposite => {
  const senders: Sender[] = []
  senders.push(new WhatsappSender())
  senders.push(new GmailSender())
  return new SenderComposite(senders)
}

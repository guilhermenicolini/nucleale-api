import { Sender } from '@/data/protocols'
import { WhatsappHelper } from './whatsapp-helper'

export class WhatsappSender implements Sender {
  async send (data: Sender.Model): Promise<void> {
    try {
      await WhatsappHelper.instance.sendMessage(data.phone, data.text)
    } catch {
      return null
    }
  }
}

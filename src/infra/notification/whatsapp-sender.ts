import { Sender } from '@/data/protocols'
import { WhatsappHelper } from './whatsapp-helper'

export class WhatsappSender implements Sender {
  async send (data: Sender.Model): Promise<void> {
    try {
      await WhatsappHelper.instance.sendMessage(data.phone, data.text)
      if (data.file) {
        await WhatsappHelper.instance.sendFile(data.phone, data.file.base64, data.file.name, data.file.mimeType)
      }
    } catch {
      return null
    }
  }
}

import { SendMessage } from '@/domain/usecases'
import { Sender } from '@/data/protocols'

export class RemoteWhatsappSendMessage implements SendMessage {
  constructor (
    private readonly sender: Sender
  ) { }

  async send (message: SendMessage.Message): Promise<void> {
    await this.sender.send(message)
  }
}

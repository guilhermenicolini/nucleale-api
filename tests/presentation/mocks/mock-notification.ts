import {
  SendMessage
} from '@/domain/usecases'

export class SendMessageSpy implements SendMessage {
  message: SendMessage.Message

  async send (message: SendMessage.Message): Promise<void> {
    this.message = message
  }
}

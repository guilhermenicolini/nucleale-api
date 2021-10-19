import { MessageModel } from '@/domain/models'

export interface SendMessage {
  send: (message: SendMessage.Message) => Promise<void>
}

export namespace SendMessage {
  export type Message = MessageModel
}

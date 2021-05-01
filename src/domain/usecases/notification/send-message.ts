import { MessageModel } from '@/domain/models'

export interface SendMessage {
  send: (message: SendMessage.Params) => Promise<void>
}

export namespace SendMessage {
  export type Params = MessageModel
}

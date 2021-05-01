import { MessageModel } from '@/domain/models'

export interface Sender {
  send (message: Sender.Model): Promise<void>
}

export namespace Sender {
  export type Model = MessageModel
}

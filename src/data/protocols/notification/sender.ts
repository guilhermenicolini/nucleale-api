import { MessageModel } from '@/domain/models'

export interface Sender {
  send (message: MessageModel): Promise<void>
}

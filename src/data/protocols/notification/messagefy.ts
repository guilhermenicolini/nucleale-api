import { MessageModel } from '@/domain/models'

export interface Messagefy {
  create (data: any): MessageModel
}

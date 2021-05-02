import { MessageModel } from '@/domain/models'

export interface Messagefy {
  create (data: any): Messagefy.Result
}

export namespace Messagefy {
  export type Result = MessageModel
}

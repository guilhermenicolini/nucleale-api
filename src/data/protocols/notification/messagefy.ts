import { MessageModel } from '@/domain/models'

export interface Messagefy {
  create (data: any): Promise<Messagefy.Result>
}

export namespace Messagefy {
  export type Result = MessageModel
}

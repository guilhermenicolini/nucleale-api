import { Messagefy } from '@/data/protocols'

export class InviteAccountMessage implements Messagefy {
  async create (data: InviteAccountMessage.Model): Promise<Messagefy.Result> {
    return {
      subject: data.subject,
      email: data.email
    }
  }
}

export namespace InviteAccountMessage {
  export type Model = {
    subject: string
    name: string
    email: string
    url: string
  }
}

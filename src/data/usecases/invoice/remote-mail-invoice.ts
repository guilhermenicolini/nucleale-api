import { MailInvoice } from '@/domain/usecases'
import { Messagefy, Sender } from '@/data/protocols'

export class RemoteMailInvoice implements MailInvoice {
  constructor (
    private readonly messagefy: Messagefy,
    private readonly sender: Sender
  ) { }

  async send (param: RemoteMailInvoice.Param): Promise<void> {
    const message = await this.messagefy.create(param)
    await this.sender.send(message)
  }
}

export namespace RemoteMailInvoice {
  export type Param = MailInvoice.Param
}

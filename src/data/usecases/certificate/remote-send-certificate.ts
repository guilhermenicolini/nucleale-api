import { SendCertificate } from '@/domain/usecases'
import { Messagefy, Sender } from '@/data/protocols'

export class RemoteSendCertificate implements SendCertificate {
  constructor (
    private readonly messagefy: Messagefy,
    private readonly sender: Sender
  ) { }

  async send (model: RemoteSendCertificate.Model): Promise<void> {
    const message = await this.messagefy.create(model)
    await this.sender.send(message)
  }
}

export namespace RemoteSendCertificate {
  export type Model = SendCertificate.Model
}

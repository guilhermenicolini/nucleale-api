import { Sender } from '@/data/protocols'

export class SenderComposite implements Sender {
  constructor (private readonly senders: Sender[]) { }

  async send (data: Sender.Model): Promise<void> {
    for (const sender of this.senders) {
      sender.send(data)
    }
  }
}

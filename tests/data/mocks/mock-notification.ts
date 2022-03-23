import { Messagefy, Sender } from '@/data/protocols'

export class MessagefySpy implements Messagefy {
  data: any
  result: Messagefy.Result = {
    email: 'mail@inbox.me',
    phone: '+5519998765432',
    text: 'any words',
    html: '<html>any text</html>'
  }

  async create (data: any): Promise<Messagefy.Result> {
    this.data = data
    return this.result
  }
}

export class SenderSpy implements Sender {
  model: Sender.Model

  async send (model: Sender.Model): Promise<void> {
    this.model = model
  }
}

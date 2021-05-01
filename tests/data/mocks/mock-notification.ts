import { Messagefy, Sender } from '@/data/protocols'

import faker from 'faker'

export class MessagefySpy implements Messagefy {
  data: any
  result: Messagefy.Result = {
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    text: faker.random.words(10),
    html: '<html>any text</html>'
  }

  create (data: any): Messagefy.Result {
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

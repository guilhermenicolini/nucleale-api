import { InviteAccountMessage } from '@/infra/notification'

import faker from 'faker'

const makeSut = (): InviteAccountMessage => new InviteAccountMessage()

describe('InviteAccountMessage', () => {
  test('Should create message on success', async () => {
    const sut = makeSut()
    const model: InviteAccountMessage.Model = {
      subject: faker.random.words(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      url: faker.internet.url()
    }
    const message = await sut.create(model)
    expect(message).toEqual({
      subject: model.subject,
      email: model.email
    })
  })
})

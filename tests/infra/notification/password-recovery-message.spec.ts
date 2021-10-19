import { PasswordRecoveryMessage } from '@/infra/notification'

import faker from 'faker'

const makeSut = (): PasswordRecoveryMessage => new PasswordRecoveryMessage()

describe('PasswordRecoveryMessage', () => {
  test('Should create message on success', async () => {
    const sut = makeSut()
    const model: PasswordRecoveryMessage.Model = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      link: faker.internet.url(),
      expiration: faker.random.word()
    }
    const message = await sut.create(model)
    expect(message).toEqual({
      email: model.email,
      phone: model.phone,
      text: `Olá, ${model.name}. Acesse ${model.link} para redefinir sua senha. Este link será válido até às ${model.expiration}`,
      html: null
    })
  })
})

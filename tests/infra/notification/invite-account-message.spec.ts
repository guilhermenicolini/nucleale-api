import { InviteAccountMessage } from '@/infra/notification'

const makeSut = (): InviteAccountMessage => new InviteAccountMessage()

describe('InviteAccountMessage', () => {
  test('Should create message on success', async () => {
    const sut = makeSut()
    const model: InviteAccountMessage.Model = {
      subject: 'any words',
      name: 'any_name',
      email: 'mail@inbox.me',
      url: 'https://site.com.br'
    }
    const message = await sut.create(model)
    expect(message).toEqual({
      subject: model.subject,
      email: model.email
    })
  })
})

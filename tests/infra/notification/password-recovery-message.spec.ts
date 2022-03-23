import { PasswordRecoveryMessage } from '@/infra/notification'

const makeSut = (): PasswordRecoveryMessage => new PasswordRecoveryMessage()

describe('PasswordRecoveryMessage', () => {
  test('Should create message on success', async () => {
    const sut = makeSut()
    const model: PasswordRecoveryMessage.Model = {
      subject: 'any words',
      name: 'any_name',
      email: 'mail@inbox.me',
      phone: '+5519998765432',
      link: 'https://site.com.br',
      expiration: 'any'
    }
    const message = await sut.create(model)
    expect(message).toEqual({
      subject: model.subject,
      email: model.email,
      phone: model.phone,
      text: `Olá, ${model.name}. Acesse ${model.link} para redefinir sua senha. Este link será válido até às ${model.expiration}`,
      html: null
    })
  })
})

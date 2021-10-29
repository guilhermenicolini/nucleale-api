import { SendCertificateMessage } from '@/infra/notification'
import { mockFileModel, mockPerson } from '@/tests/domain/mocks'

const makeSut = (): SendCertificateMessage => new SendCertificateMessage()

describe('SendCertificateMessage', () => {
  test('Should create message on success', async () => {
    const person = mockPerson()
    const sut = makeSut()
    const model: SendCertificateMessage.Model = {
      email: person.email,
      name: person.name,
      phone: person.phone,
      file: mockFileModel()
    }
    const message = await sut.create(model)
    expect(message).toEqual({
      subject: 'Seu certificado está pronto',
      email: model.email,
      phone: model.phone,
      text: `Olá, ${model.name}. Seu certificado foi gerado e já estamos te encaminhado.`,
      file: model.file
    })
  })
})

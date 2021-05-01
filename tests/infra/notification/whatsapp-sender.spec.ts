import { MessageModel } from '@/domain/models'
import { WhatsappSender } from '@/infra/notification'
import faker from 'faker'

const sendMessageStub = jest.fn()

jest.mock('@wppconnect-team/wppconnect', jest.fn().mockImplementation(() => {
  return {
    create: jest.fn().mockImplementation(() => ({
      sendText: sendMessageStub,
      close: jest.fn()
    }))
  }
}))
const mockData = (): MessageModel => ({
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  text: faker.random.words(5),
  html: faker.random.word()
})

const makeSut = (): WhatsappSender => new WhatsappSender()

describe('Whatsapp Sender', () => {
  test('Should call WhatsappHelper with correct values', async () => {
    const sut = makeSut()
    const data = mockData()
    await sut.send(data)
    expect(sendMessageStub).toHaveBeenLastCalledWith(`${data.phone}@c.us`, data.text)
  })
})

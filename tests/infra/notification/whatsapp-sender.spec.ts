import { MessageModel } from '@/domain/models'
import { WhatsappSender } from '@/infra/notification'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

let sendMessageStub = jest.fn()

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
  beforeEach(async () => {
    sendMessageStub = jest.fn()
  })

  test('Should call WhatsappHelper with correct values', async () => {
    const sut = makeSut()
    const data = mockData()
    await sut.send(data)
    expect(sendMessageStub).toHaveBeenLastCalledWith(`${data.phone}@c.us`, data.text)
  })

  test('Should return null if  WhatsappHelper throws', async () => {
    const sut = makeSut()
    const data = mockData()
    sendMessageStub = jest.fn().mockImplementation(throwError)
    const result = await sut.send(data)
    expect(result).toBeFalsy()
  })
})

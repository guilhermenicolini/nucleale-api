import { MessageModel } from '@/domain/models'
import { WhatsappSender, WhatsappHelper } from '@/infra/notification'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

jest.mock('@wppconnect-team/wppconnect', jest.fn().mockImplementation(() => {
  return {
    create: jest.fn().mockImplementation(() => ({
      sendText: jest.fn(),
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
    WhatsappHelper.instance.sendMessage = jest.fn()
    await sut.send(data)
    expect(WhatsappHelper.instance.sendMessage).toHaveBeenLastCalledWith(data.phone, data.text)
  })

  test('Should return null if WhatsappHelper throws', async () => {
    const sut = makeSut()
    const data = mockData()
    WhatsappHelper.instance.sendMessage = jest.fn().mockImplementation(throwError)
    const result = await sut.send(data)
    expect(result).toBe(null)
  })
})

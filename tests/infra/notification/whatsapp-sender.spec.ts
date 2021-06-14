import { MessageModel } from '@/domain/models'
import { WhatsappSender, WhatsappHelper } from '@/infra/notification'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

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

  test('Should call WhatsappHelper file with correct values', async () => {
    const sut = makeSut()
    const data = mockData()
    data.file = {
      base64: Buffer.from('any_text').toString('base64'),
      name: faker.system.commonFileName('pdf')
    }
    WhatsappHelper.instance.sendMessage = jest.fn()
    WhatsappHelper.instance.sendFile = jest.fn()
    await sut.send(data)
    expect(WhatsappHelper.instance.sendMessage).toHaveBeenLastCalledWith(data.phone, data.text)
    expect(WhatsappHelper.instance.sendFile).toHaveBeenLastCalledWith(data.phone, data.file.base64, data.file.name)
  })

  test('Should return null if WhatsappHelper sendMessage throws', async () => {
    const sut = makeSut()
    const data = mockData()
    WhatsappHelper.instance.sendMessage = jest.fn().mockImplementation(throwError)
    const result = await sut.send(data)
    expect(result).toBe(null)
  })

  test('Should return null if WhatsappHelper sendFile throws', async () => {
    const sut = makeSut()
    const data = mockData()
    data.file = {
      base64: Buffer.from('any_text').toString('base64'),
      name: faker.system.commonFileName('pdf')
    }
    WhatsappHelper.instance.sendMessage = jest.fn()
    WhatsappHelper.instance.sendFile = jest.fn().mockImplementation(throwError)
    const result = await sut.send(data)
    expect(result).toBe(null)
  })
})

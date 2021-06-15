import { WhatsappHelper as sut } from '@/infra/notification'
import { sendMessageStub, sendFileFromBase64Stub } from '@/tests/mock'

describe('Whatsapp Helper', () => {
  beforeAll(async () => {
    await sut.instance.connect()
  })

  afterAll(async () => {
    await sut.instance.disconnect()
  })

  test('Should reconnect on send message if client is down', async () => {
    await sut.instance.sendMessage('any_phone', 'any_message')
    await sut.instance.disconnect()
    await sut.instance.sendMessage('any_phone', 'any_message')
    expect(sendMessageStub).toHaveBeenCalledTimes(2)
  })

  test('Should reconnect on send file if client is down', async () => {
    await sut.instance.sendFile('any_phone', 'any_base64', 'any_file', 'any_mimetype')
    await sut.instance.disconnect()
    await sut.instance.sendFile('any_phone', 'any_base64', 'any_file', 'any_mimetype')
    expect(sendFileFromBase64Stub).toHaveBeenCalledTimes(2)
  })
})

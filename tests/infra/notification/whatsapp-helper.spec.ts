import { WhatsappHelper as sut } from '@/infra/notification'
import { sendMessageStub } from '@/tests/mock'

describe('Whatsapp Helper', () => {
  beforeAll(async () => {
    await sut.instance.connect()
  })

  afterAll(async () => {
    await sut.instance.disconnect()
  })

  test('Should reconnect if client is down', async () => {
    await sut.instance.sendMessage('any_phone', 'any_message')
    await sut.instance.disconnect()
    await sut.instance.sendMessage('any_phone', 'any_message')
    expect(sendMessageStub).toHaveBeenCalledTimes(2)
  })
})

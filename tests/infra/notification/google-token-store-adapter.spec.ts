import { GoogleTokenStore } from '@/infra/notification'
import faker from 'faker'

const sessionName = faker.random.word().toLowerCase()
const makeSut = (): GoogleTokenStore => new GoogleTokenStore()

describe('GoogleTokenStore Adapter', () => {
  test('Should get token on success', async () => {
    const sut = makeSut()
    const token = await sut.getToken(sessionName)
    expect(token).toEqual({ ok: 'ok' })
  })
})

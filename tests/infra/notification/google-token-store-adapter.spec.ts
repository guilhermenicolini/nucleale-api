import { GoogleTokenStore } from '@/infra/notification'
import faker from 'faker'

const sessionName = faker.random.word().toLowerCase()
const makeSut = (): GoogleTokenStore => new GoogleTokenStore()

let existsStub = jest.fn().mockImplementation(() => [true])

jest.mock('@google-cloud/storage', () => ({
  Storage: jest.fn().mockImplementation(() => {
    return {
      bucket: jest.fn().mockImplementation(() => ({
        file: jest.fn().mockImplementation(() => ({
          exists: existsStub,
          download: jest.fn().mockImplementation(() => Buffer.from(JSON.stringify({ ok: 'ok' }), 'utf8'))
        }))
      }))
    }
  })
}))

describe('GoogleTokenStore Adapter', () => {
  test('Should get token on success', async () => {
    const sut = makeSut()
    const token = await sut.getToken(sessionName)
    expect(token).toEqual({ ok: 'ok' })
  })

  test('Should return null if token not exists', async () => {
    const sut = makeSut()
    existsStub = jest.fn().mockImplementation(() => [false])
    const token = await sut.getToken(sessionName)
    expect(token).toBeFalsy()
  })
})

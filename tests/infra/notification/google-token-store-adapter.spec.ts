import { GoogleTokenStore } from '@/infra/notification'
import { SessionToken } from '@wppconnect-team/wppconnect/dist/token-store'
import faker from 'faker'

const sessionName = faker.random.word().toLowerCase()
const mockSessionToken = (): SessionToken => ({
  WABrowserId: '',
  WASecretBundle: '',
  WAToken1: '',
  WAToken2: ''
})

const makeSut = (): GoogleTokenStore => new GoogleTokenStore()

let existsStub = jest.fn().mockImplementation(() => [true])

jest.mock('@google-cloud/storage', () => ({
  Storage: jest.fn().mockImplementation(() => {
    return {
      bucket: jest.fn().mockImplementation(() => ({
        file: jest.fn().mockImplementation(() => ({
          exists: existsStub,
          save: jest.fn(),
          download: jest.fn().mockImplementation(() => Buffer.from(JSON.stringify({ ok: 'ok' }), 'utf8'))
        })),
        getFiles: jest.fn().mockImplementation(() => [[{ name: 'token1' }, { name: 'token2' }]])
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

  test('Should set token on success', async () => {
    const sut = makeSut()
    const result = await sut.setToken(sessionName, mockSessionToken())
    expect(result).toBe(true)
  })

  test('Should return false if delete token not exists', async () => {
    const sut = makeSut()
    existsStub = jest.fn().mockImplementation(() => [false])
    const token = await sut.removeToken(sessionName)
    expect(token).toBe(false)
  })

  test('Should return true if delete token exists', async () => {
    const sut = makeSut()
    const token = await sut.removeToken(sessionName)
    expect(token).toBe(false)
  })

  test('Should return all tokens', async () => {
    const sut = makeSut()
    const tokens = await sut.listTokens()
    expect(tokens).toEqual(['token1', 'token2'])
  })
})

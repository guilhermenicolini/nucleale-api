import { DbLoadAccountByToken } from '@/data/usecases'
import { DecrypterSpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const sut = new DbLoadAccountByToken(decrypterSpy)
  return {
    sut,
    decrypterSpy
  }
}

let token: string
let role: string

describe('DbLoadAccountByToken Usecase', () => {
  beforeEach(() => {
    token = faker.random.uuid()
    role = faker.random.word()
  })

  test('Should call Decrypter with correct ciphertext', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.load(token, role)
    expect(decrypterSpy.ciphertext).toBe(token)
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.result = null
    const account = await sut.load(token, role)
    expect(account).toBeNull()
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
    const account = await sut.load(token, role)
    await expect(account).toBeNull()
  })

  test('Should return token if role is not provided', async () => {
    const { sut, decrypterSpy } = makeSut()
    const account = await sut.load(token, null)
    expect(account).toEqual({
      isValid: true,
      userId: decrypterSpy.result.sub,
      accountId: decrypterSpy.result.acc
    })
  })

  test('Should return token if role is valid', async () => {
    const { sut, decrypterSpy } = makeSut()
    const account = await sut.load(token, decrypterSpy.result.role)
    expect(account).toEqual({
      isValid: true,
      userId: decrypterSpy.result.sub,
      accountId: decrypterSpy.result.acc
    })
  })

  test('Should not return token if role is valid', async () => {
    const { sut } = makeSut()
    const account = await sut.load(token, role)
    expect(account).toEqual({
      isValid: false,
      userId: null,
      accountId: null
    })
  })
})

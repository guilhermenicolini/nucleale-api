import { JwtAdapter } from '@/infra/cryptography'
import { throwError } from '@/tests/domain/mocks'
import env from '@/main/config/env'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return 'any_token'
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
  describe('sign()', () => {
    test('Should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.sign({ sub: 'any_sub', role: 'any_role' })
      expect(signSpy).toHaveBeenCalledWith({
        sub: 'any_sub',
        iss: env.iss,
        aud: env.aud,
        role: 'any_role'
      }, 'secret', { expiresIn: env.exp })
    })

    test('Should return a token on sign success', async () => {
      const sut = makeSut()
      const accessToken = await sut.sign({ sub: 'any_sub', role: 'any_role' })
      expect(accessToken).toBe('any_token')
    })

    test('Should throw if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
      const promise = sut.sign({ sub: 'any_sub', role: 'any_role' })
      await expect(promise).rejects.toThrow()
    })
  })
})

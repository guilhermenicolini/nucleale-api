import { JwtAdapter } from '@/infra/cryptography'

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
      await sut.sign({ sub: 'any_sub' })
      expect(signSpy).toHaveBeenCalledWith({ sub: 'any_sub' }, 'secret')
    })
  })
})

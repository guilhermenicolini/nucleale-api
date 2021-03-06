import { TokenAuthentication } from '@/data/usecases'
import { SignerSpy } from '@/tests/data/mocks'
import { mockAuthenticationParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: TokenAuthentication,
  signerSpy: SignerSpy
}

const makeSut = (): SutTypes => {
  const signerSpy = new SignerSpy()
  const sut = new TokenAuthentication(signerSpy)
  return {
    sut,
    signerSpy
  }
}

describe('TokenAuthentication Usecase', () => {
  test('Should call Signer with correct values', async () => {
    const { sut, signerSpy } = makeSut()
    const params = mockAuthenticationParams()
    await sut.auth(params)
    expect(signerSpy.data).toEqual({
      sub: params.userId,
      acc: params.accountId,
      role: params.role
    })
  })

  test('Should throw if Signer throws', async () => {
    const { sut, signerSpy } = makeSut()
    jest.spyOn(signerSpy, 'sign').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a token on success', async () => {
    const { sut, signerSpy } = makeSut()
    const result = await sut.auth(mockAuthenticationParams())
    expect(result.accessToken).toBe(signerSpy.result)
  })
})

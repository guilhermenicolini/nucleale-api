import { TokenAuthentication } from '@/data/usecases'
import { SignerSpy } from '@/tests/data/mocks'
import { mockAuthenticationParams } from '@/tests/domain/mocks'

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
      acc: params.accountId
    })
  })
})

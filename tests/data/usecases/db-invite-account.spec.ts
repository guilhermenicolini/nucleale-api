import { DbInviteAccount } from '@/data/usecases'
import { InviteAccountRepositorySpy } from '@/tests/data/mocks'
import { mockInvitation, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbInviteAccount
  inviteAccountRepositorySpy: InviteAccountRepositorySpy
}

const makeSut = (): SutTypes => {
  const inviteAccountRepositorySpy = new InviteAccountRepositorySpy()
  const sut = new DbInviteAccount(inviteAccountRepositorySpy)

  return {
    sut,
    inviteAccountRepositorySpy
  }
}

describe('DbInviteAccount Usecase', () => {
  test('Should call InviteAccountRepository with correct values', async () => {
    const { sut, inviteAccountRepositorySpy } = makeSut()
    const params = mockInvitation()
    await sut.invite(params.accountId, params.email)
    expect(inviteAccountRepositorySpy.accountId).toBe(params.accountId)
    expect(inviteAccountRepositorySpy.email).toBe(params.email)
  })

  test('Should throw if InviteAccountRepository throws', async () => {
    const { sut, inviteAccountRepositorySpy } = makeSut()
    jest.spyOn(inviteAccountRepositorySpy, 'inviteAccount').mockImplementationOnce(throwError)
    const params = mockInvitation()
    const promise = sut.invite(params.accountId, params.email)
    await expect(promise).rejects.toThrow()
  })

  // test('Should return null if LoadAccountByEmailRepository returns null', async () => {
  //   const { sut, loadAccountByEmailRepositorySpy } = makeSut()
  //   loadAccountByEmailRepositorySpy.result = null
  //   const result = await sut.verify(mockVerifyAccountParams())
  //   expect(result).toBeNull()
  // })

  // test('Should call HashComparer with correct values', async () => {
  //   const { sut, hashComparerSpy, loadAccountByEmailRepositorySpy } = makeSut()
  //   const params = mockVerifyAccountParams()
  //   await sut.verify(params)
  //   expect(hashComparerSpy.plainText).toBe(params.password)
  //   expect(hashComparerSpy.digest).toBe(loadAccountByEmailRepositorySpy.result.password)
  // })

  // test('Should throw if HashComparer throws', async () => {
  //   const { sut, hashComparerSpy } = makeSut()
  //   jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
  //   const promise = sut.verify(mockVerifyAccountParams())
  //   await expect(promise).rejects.toThrow()
  // })

  // test('Should return null if HashComparer returns false', async () => {
  //   const { sut, hashComparerSpy } = makeSut()
  //   hashComparerSpy.result = false
  //   const result = await sut.verify(mockVerifyAccountParams())
  //   expect(result).toBeNull()
  // })

  // test('Should return an account on success', async () => {
  //   const { sut, loadAccountByEmailRepositorySpy } = makeSut()
  //   const result = await sut.verify(mockVerifyAccountParams())
  //   expect(result.accountId).toBe(loadAccountByEmailRepositorySpy.result.accountId)
  //   expect(result.userId).toBe(loadAccountByEmailRepositorySpy.result.userId)
  // })
})

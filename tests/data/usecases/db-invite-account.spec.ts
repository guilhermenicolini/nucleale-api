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

  test('Should return false if InviteAccountRepository returns false', async () => {
    const { sut, inviteAccountRepositorySpy } = makeSut()
    inviteAccountRepositorySpy.result = false
    const params = mockInvitation()
    const result = await sut.invite(params.accountId, params.email)
    expect(result).toBe(false)
  })
})

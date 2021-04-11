import { DbInviteAccount } from '@/data/usecases'
import { InviteAccountRepositorySpy } from '@/tests/data/mocks'
import { mockInvitation } from '@/tests/domain/mocks'

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
})

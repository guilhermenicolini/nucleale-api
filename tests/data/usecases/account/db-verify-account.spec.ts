import { DbLoadInvitation } from '@/data/usecases'
import { LoadInvitationRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadInvitation,
  loadInvitationRepositorySpy: LoadInvitationRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadInvitationRepositorySpy = new LoadInvitationRepositorySpy()
  const sut = new DbLoadInvitation(loadInvitationRepositorySpy)

  return {
    sut,
    loadInvitationRepositorySpy
  }
}

describe('DbLoadInvitation Usecase', () => {
  test('Should call LoadInvitationRepository with correct values', async () => {
    const { sut, loadInvitationRepositorySpy } = makeSut()
    const email = 'mail@inbox.me'
    await sut.load(email)
    expect(loadInvitationRepositorySpy.email).toBe(email)
  })

  test('Should throw if LoadInvitationRepository throws', async () => {
    const { sut, loadInvitationRepositorySpy } = makeSut()
    jest.spyOn(loadInvitationRepositorySpy, 'loadInvitation').mockImplementationOnce(throwError)
    const promise = sut.load('mail@inbox.me')
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadInvitationRepository returns null', async () => {
    const { sut, loadInvitationRepositorySpy } = makeSut()
    loadInvitationRepositorySpy.result = null
    const result = await sut.load('mail@inbox.me')
    expect(result).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut, loadInvitationRepositorySpy } = makeSut()
    const result = await sut.load('mail@inbox.me')
    expect(result).toBe(loadInvitationRepositorySpy.result)
  })
})

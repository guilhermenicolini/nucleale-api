import { DbSaveAccount } from '@/data/usecases'
import { SaveAccountRepositorySpy } from '@/tests/data/mocks'
import { throwError, mockAccountModel } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbSaveAccount
  saveAccountRepositorySpy: SaveAccountRepositorySpy
}

const makeSut = (): SutTypes => {
  const saveAccountRepositorySpy = new SaveAccountRepositorySpy()
  const sut = new DbSaveAccount(saveAccountRepositorySpy)

  return {
    sut,
    saveAccountRepositorySpy
  }
}

describe('DbSaveAccount Usecase', () => {
  test('Should call SaveAccountRepository with correct values', async () => {
    const { sut, saveAccountRepositorySpy } = makeSut()
    const data = mockAccountModel()
    await sut.save('any_id', data)
    expect(saveAccountRepositorySpy.userId).toBe('any_id')
    expect(saveAccountRepositorySpy.data).toBe(data)
  })

  test('Should throw if SaveAccountRepository throws', async () => {
    const { sut, saveAccountRepositorySpy } = makeSut()
    jest.spyOn(saveAccountRepositorySpy, 'save').mockImplementationOnce(throwError)
    const promise = sut.save('any_id', {})
    await expect(promise).rejects.toThrow()
  })
})

import { DbSaveAddress } from '@/data/usecases'
import { SaveAddressRepositorySpy } from '@/tests/data/mocks'
import { mockAddressModel, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbSaveAddress
  saveAddressRepositorySpy: SaveAddressRepositorySpy
}

const makeSut = (): SutTypes => {
  const saveAddressRepositorySpy = new SaveAddressRepositorySpy()
  const sut = new DbSaveAddress(saveAddressRepositorySpy)

  return {
    sut,
    saveAddressRepositorySpy
  }
}

describe('DbSaveAddress Usecase', () => {
  test('Should call SaveAddressRepository with correct values', async () => {
    const { sut, saveAddressRepositorySpy } = makeSut()
    const params = mockAddressModel()
    await sut.save(params)
    expect(saveAddressRepositorySpy.params).toEqual(params)
  })

  test('Should throw if SaveAddressRepository throws', async () => {
    const { sut, saveAddressRepositorySpy } = makeSut()
    jest.spyOn(saveAddressRepositorySpy, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(mockAddressModel())
    await expect(promise).rejects.toThrow()
  })
})

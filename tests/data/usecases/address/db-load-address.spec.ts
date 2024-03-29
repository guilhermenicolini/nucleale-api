import { DbLoadAddress } from '@/data/usecases'
import { LoadAddressRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

const mockAccountId = (): string => 'any_id'

type SutTypes = {
  sut: DbLoadAddress
  loadAddressRepositorySpy: LoadAddressRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAddressRepositorySpy = new LoadAddressRepositorySpy()
  const sut = new DbLoadAddress(loadAddressRepositorySpy)

  return {
    sut,
    loadAddressRepositorySpy
  }
}

describe('DbLoadAddress Usecase', () => {
  test('Should call LoadAddressRepository with correct values', async () => {
    const { sut, loadAddressRepositorySpy } = makeSut()
    const accountId = mockAccountId()
    await sut.load(accountId)
    expect(loadAddressRepositorySpy.accountId).toBe(accountId)
  })

  test('Should throw if LoadAddressRepository throws', async () => {
    const { sut, loadAddressRepositorySpy } = makeSut()
    jest.spyOn(loadAddressRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.load(mockAccountId())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an address on success', async () => {
    const { sut, loadAddressRepositorySpy } = makeSut()
    const address = await sut.load(mockAccountId())
    expect(address).toEqual(loadAddressRepositorySpy.result)
  })

  test('Should return null if LoadAddressRepository returns null', async () => {
    const { sut, loadAddressRepositorySpy } = makeSut()
    loadAddressRepositorySpy.result = null
    const address = await sut.load(mockAccountId())
    expect(address).toBeFalsy()
  })
})

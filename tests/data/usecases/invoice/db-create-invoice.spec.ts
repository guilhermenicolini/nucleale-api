import { DbCreateInvoice } from '@/data/usecases'
import { RecordNotFoundError } from '@/presentation/errors'
import {
  LoadAccountRepositorySpy,
  LoadAddressRepositorySpy,
  LoadCompanyRepositorySpy,
  LoadProcedureRepositorySpy,
  LoadNextRpsRepositorySpy
} from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'
import { ObjectId } from 'mongodb'

const mockParams = () => ({
  userId: faker.datatype.uuid(),
  procedureId: new ObjectId().toString(),
  amount: faker.datatype.number(),
  data: faker.name.findName()
})

type SutTypes = {
  sut: DbCreateInvoice
  loadAccountRepositorySpy: LoadAccountRepositorySpy,
  loadAddressRepositorySpy: LoadAddressRepositorySpy,
  loadCompanyRepositorySpy: LoadCompanyRepositorySpy,
  loadProcedureRepositorySpy: LoadProcedureRepositorySpy
  loadNextRpsRepositorySpy: LoadNextRpsRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountRepositorySpy = new LoadAccountRepositorySpy()
  const loadAddressRepositorySpy = new LoadAddressRepositorySpy()
  const loadCompanyRepositorySpy = new LoadCompanyRepositorySpy()
  const loadProcedureRepositorySpy = new LoadProcedureRepositorySpy()
  const loadNextRpsRepositorySpy = new LoadNextRpsRepositorySpy()
  const sut = new DbCreateInvoice(
    loadAccountRepositorySpy,
    loadAddressRepositorySpy,
    loadCompanyRepositorySpy,
    loadProcedureRepositorySpy,
    loadNextRpsRepositorySpy
  )

  return {
    sut,
    loadAccountRepositorySpy,
    loadAddressRepositorySpy,
    loadCompanyRepositorySpy,
    loadProcedureRepositorySpy,
    loadNextRpsRepositorySpy
  }
}

describe('DbCreateInvoice Usecase', () => {
  test('Should call LoadAccountRepository with correct values', async () => {
    const { sut, loadAccountRepositorySpy } = makeSut()
    const params = mockParams()
    await sut.create(params)
    expect(loadAccountRepositorySpy.userId).toBe(params.userId)
  })

  test('Should throw if LoadAccountRepository throws', async () => {
    const { sut, loadAccountRepositorySpy } = makeSut()
    jest.spyOn(loadAccountRepositorySpy, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.create(mockParams())
    expect(promise).rejects.toThrow()
  })

  test('Should return error if LoadAccountRepository returns null', async () => {
    const { sut, loadAccountRepositorySpy } = makeSut()
    loadAccountRepositorySpy.result = null
    const result = await sut.create(mockParams())
    expect(result).toEqual(new RecordNotFoundError('Account'))
  })

  test('Should call LoadAddressRepository with correct values', async () => {
    const { sut, loadAccountRepositorySpy, loadAddressRepositorySpy } = makeSut()
    await sut.create(mockParams())
    expect(loadAddressRepositorySpy.accountId).toBe(loadAccountRepositorySpy.result.accountId)
  })

  test('Should throw if LoadAddressRepository throws', async () => {
    const { sut, loadAddressRepositorySpy } = makeSut()
    jest.spyOn(loadAddressRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.create(mockParams())
    expect(promise).rejects.toThrow()
  })

  test('Should return error if LoadAddressRepository returns null', async () => {
    const { sut, loadAddressRepositorySpy } = makeSut()
    loadAddressRepositorySpy.result = null
    const result = await sut.create(mockParams())
    expect(result).toEqual(new RecordNotFoundError('Address'))
  })

  test('Should call LoadCompanyRepository', async () => {
    const { sut, loadCompanyRepositorySpy } = makeSut()
    const spy = jest.spyOn(loadCompanyRepositorySpy, 'load')
    await sut.create(mockParams())
    expect(spy).toHaveBeenCalled()
  })

  test('Should throw if LoadCompanyRepository throws', async () => {
    const { sut, loadCompanyRepositorySpy } = makeSut()
    jest.spyOn(loadCompanyRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.create(mockParams())
    expect(promise).rejects.toThrow()
  })

  test('Should return error if LoadCompanyRepository returns null', async () => {
    const { sut, loadCompanyRepositorySpy } = makeSut()
    loadCompanyRepositorySpy.result = null
    const result = await sut.create(mockParams())
    expect(result).toEqual(new RecordNotFoundError('Company'))
  })
})

import { DbCreateInvoice } from '@/data/usecases'
import { RecordNotFoundError } from '@/presentation/errors'
import {
  LoadAccountRepositorySpy,
  LoadAddressRepositorySpy,
  LoadCompanyRepositorySpy,
  LoadProcedureRepositorySpy,
  LoadNextRpsRepositorySpy,
  ModelsToInvoiceConverterSpy
} from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import { ObjectId } from 'mongodb'

const mockParams = () => ({
  userId: 'any_id',
  procedureId: new ObjectId().toString(),
  amount: 123,
  data: 'any_data'
})

type SutTypes = {
  sut: DbCreateInvoice
  loadAccountRepositorySpy: LoadAccountRepositorySpy,
  loadAddressRepositorySpy: LoadAddressRepositorySpy,
  loadCompanyRepositorySpy: LoadCompanyRepositorySpy,
  loadProcedureRepositorySpy: LoadProcedureRepositorySpy
  loadNextRpsRepositorySpy: LoadNextRpsRepositorySpy,
  modelsToInvoiceConverterSpy: ModelsToInvoiceConverterSpy
}

const makeSut = (): SutTypes => {
  const loadAccountRepositorySpy = new LoadAccountRepositorySpy()
  const loadAddressRepositorySpy = new LoadAddressRepositorySpy()
  const loadCompanyRepositorySpy = new LoadCompanyRepositorySpy()
  const loadProcedureRepositorySpy = new LoadProcedureRepositorySpy()
  const loadNextRpsRepositorySpy = new LoadNextRpsRepositorySpy()
  const modelsToInvoiceConverterSpy = new ModelsToInvoiceConverterSpy()
  const sut = new DbCreateInvoice(
    loadAccountRepositorySpy,
    loadAddressRepositorySpy,
    loadCompanyRepositorySpy,
    loadProcedureRepositorySpy,
    loadNextRpsRepositorySpy,
    modelsToInvoiceConverterSpy
  )

  return {
    sut,
    loadAccountRepositorySpy,
    loadAddressRepositorySpy,
    loadCompanyRepositorySpy,
    loadProcedureRepositorySpy,
    loadNextRpsRepositorySpy,
    modelsToInvoiceConverterSpy
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
    expect(result).toEqual(new RecordNotFoundError('Conta não encontrada'))
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
    expect(result).toEqual(new RecordNotFoundError('Endereço não encontrado'))
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
    expect(result).toEqual(new RecordNotFoundError('Empresa não encontrada'))
  })

  test('Should call LoadProcedureRepository with correct values', async () => {
    const { sut, loadProcedureRepositorySpy } = makeSut()
    const params = mockParams()
    await sut.create(params)
    expect(loadProcedureRepositorySpy.procedureId).toBe(params.procedureId)
  })

  test('Should throw if LoadProcedureRepository throws', async () => {
    const { sut, loadProcedureRepositorySpy } = makeSut()
    jest.spyOn(loadProcedureRepositorySpy, 'loadProcedure').mockImplementationOnce(throwError)
    const promise = sut.create(mockParams())
    expect(promise).rejects.toThrow()
  })

  test('Should return error if LoadProcedureRepository returns null', async () => {
    const { sut, loadProcedureRepositorySpy } = makeSut()
    loadProcedureRepositorySpy.result = null
    const result = await sut.create(mockParams())
    expect(result).toEqual(new RecordNotFoundError('Procedimento não encontrado'))
  })

  test('Should call LoadNextRpsRepository', async () => {
    const { sut, loadNextRpsRepositorySpy } = makeSut()
    const spy = jest.spyOn(loadNextRpsRepositorySpy, 'next')
    await sut.create(mockParams())
    expect(spy).toHaveBeenCalled()
  })

  test('Should throw if LoadNextRpsRepository throws', async () => {
    const { sut, loadNextRpsRepositorySpy } = makeSut()
    jest.spyOn(loadNextRpsRepositorySpy, 'next').mockImplementationOnce(throwError)
    const promise = sut.create(mockParams())
    expect(promise).rejects.toThrow()
  })

  test('Should return error if LoadNextRpsRepository returns null', async () => {
    const { sut, loadNextRpsRepositorySpy } = makeSut()
    loadNextRpsRepositorySpy.result = null
    const result = await sut.create(mockParams())
    expect(result).toEqual(new RecordNotFoundError('Rps não encontrado'))
  })

  test('Should return error if LoadNextRpsRepository returns 0', async () => {
    const { sut, loadNextRpsRepositorySpy } = makeSut()
    loadNextRpsRepositorySpy.result = 0
    const result = await sut.create(mockParams())
    expect(result).toEqual(new RecordNotFoundError('Rps não encontrado'))
  })

  test('Should call ModelsToInvoiceConverter with correct values', async () => {
    const {
      sut,
      loadAccountRepositorySpy,
      loadAddressRepositorySpy,
      loadCompanyRepositorySpy,
      loadProcedureRepositorySpy,
      loadNextRpsRepositorySpy,
      modelsToInvoiceConverterSpy
    } = makeSut()
    const params = mockParams()
    await sut.create(params)
    expect(modelsToInvoiceConverterSpy.data).toEqual({
      account: loadAccountRepositorySpy.result,
      address: loadAddressRepositorySpy.result,
      company: loadCompanyRepositorySpy.result,
      procedure: loadProcedureRepositorySpy.result,
      rpsNumber: loadNextRpsRepositorySpy.result,
      amount: params.amount,
      data: params.data
    })
  })

  test('Should throw if ModelsToInvoiceConverter throws', async () => {
    const { sut, modelsToInvoiceConverterSpy } = makeSut()
    jest.spyOn(modelsToInvoiceConverterSpy, 'convert').mockImplementationOnce(throwError)
    const promise = sut.create(mockParams())
    expect(promise).rejects.toThrow()
  })
})

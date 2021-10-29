import { DbChangePassword } from '@/data/usecases'
import { LinkTypes } from '@/domain/models'
import { ClientError, RecordNotFoundError } from '@/presentation/errors'
import { HasherSpy, LoadLinkRepositorySpy, SaveAccountRepositorySpy, DeleteLinkRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'
import MockDate from 'mockdate'

const mockParams = () => ({
  token: faker.datatype.uuid(),
  password: 'P@ssw0rd'
})

type SutTypes = {
  sut: DbChangePassword
  hasherSpy: HasherSpy
  loadLinkRepositorySpy: LoadLinkRepositorySpy
  saveAccountRepositorySpy: SaveAccountRepositorySpy
  deleteLinkRepositorySpy: DeleteLinkRepositorySpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const loadLinkRepositorySpy = new LoadLinkRepositorySpy()
  const saveAccountRepositorySpy = new SaveAccountRepositorySpy()
  const deleteLinkRepositorySpy = new DeleteLinkRepositorySpy()
  const sut = new DbChangePassword(
    hasherSpy,
    loadLinkRepositorySpy,
    saveAccountRepositorySpy,
    deleteLinkRepositorySpy)
  return {
    sut,
    hasherSpy,
    loadLinkRepositorySpy,
    saveAccountRepositorySpy,
    deleteLinkRepositorySpy
  }
}

describe('DbChangePassword Usecase', () => {
  beforeAll(async () => {
    MockDate.set(new Date().valueOf())
  })

  test('Should call LoadLinkRepository with correct values', async () => {
    const { sut, loadLinkRepositorySpy } = makeSut()
    const params = mockParams()
    await sut.change(params)
    expect(loadLinkRepositorySpy.params).toEqual({
      token: params.token,
      type: LinkTypes.passwordRecovery
    })
  })

  test('Should return error if LoadLinkRepository returns null', async () => {
    const { sut, loadLinkRepositorySpy } = makeSut()
    loadLinkRepositorySpy.result = null
    const result = await sut.change(mockParams())
    expect(result).toEqual(new RecordNotFoundError('Token não encontrado'))
  })

  test('Should return error if link is expired', async () => {
    const { sut, loadLinkRepositorySpy } = makeSut()
    loadLinkRepositorySpy.result.expiration = faker.date.past().valueOf()
    const result = await sut.change(mockParams())
    expect(result).toEqual(new ClientError('Token expirado'))
  })

  test('Should return error if link expiration is null', async () => {
    const { sut, loadLinkRepositorySpy } = makeSut()
    loadLinkRepositorySpy.result.expiration = null
    const result = await sut.change(mockParams())
    expect(result).toEqual(new ClientError('Token expirado'))
  })

  test('Should call Hasher with correct values', async () => {
    const { sut, hasherSpy } = makeSut()
    const params = mockParams()
    await sut.change(params)
    expect(hasherSpy.plainText).toBe(params.password)
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const promise = sut.change(mockParams())
    expect(promise).rejects.toThrow()
  })

  test('Should call SaveAccountRepository with correct values', async () => {
    const { sut, hasherSpy, loadLinkRepositorySpy, saveAccountRepositorySpy } = makeSut()
    await sut.change(mockParams())
    expect(saveAccountRepositorySpy.userId).toBe(loadLinkRepositorySpy.result.userId)
    expect(saveAccountRepositorySpy.data).toEqual({
      password: hasherSpy.result
    })
  })

  test('Should throw if SaveAccountRepository throws', async () => {
    const { sut, saveAccountRepositorySpy } = makeSut()
    jest.spyOn(saveAccountRepositorySpy, 'save').mockImplementationOnce(throwError)
    const promise = sut.change(mockParams())
    expect(promise).rejects.toThrow()
  })

  test('Should call DeleteLinkRepository with correct values', async () => {
    const { sut, deleteLinkRepositorySpy } = makeSut()
    const params = mockParams()
    await sut.change(params)
    expect(deleteLinkRepositorySpy.token).toBe(params.token)
  })

  test('Should throw if DeleteLinkRepository throws', async () => {
    const { sut, deleteLinkRepositorySpy } = makeSut()
    jest.spyOn(deleteLinkRepositorySpy, 'delete').mockImplementationOnce(throwError)
    const promise = sut.change(mockParams())
    expect(promise).rejects.toThrow()
  })

  test('Should return falsy on success', async () => {
    const { sut } = makeSut()
    const result = await sut.change(mockParams())
    expect(result).toBeFalsy()
  })
})

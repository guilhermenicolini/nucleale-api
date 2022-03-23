import { DbCheckAccountLink } from '@/data/usecases'
import { LinkTypes } from '@/domain/models'
import { LoadLinkRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'

const mockToken = (): string => 'any_id'

type SutTypes = {
  sut: DbCheckAccountLink
  loadLinkRepositorySpy: LoadLinkRepositorySpy
}

let type: LinkTypes

const makeSut = (): SutTypes => {
  const loadLinkRepositorySpy = new LoadLinkRepositorySpy()
  const sut = new DbCheckAccountLink(type, loadLinkRepositorySpy)
  return {
    sut,
    loadLinkRepositorySpy
  }
}

describe('DbCheckAccountLink Usecase', () => {
  beforeAll(async () => {
    MockDate.set(1647982564066)
  })

  beforeEach(async () => {
    type = LinkTypes.passwordRecovery
  })

  test('Should call LoadLinkRepository with correct values', async () => {
    const { sut, loadLinkRepositorySpy } = makeSut()
    const token = mockToken()
    await sut.check(token)
    expect(loadLinkRepositorySpy.params).toEqual({
      token,
      type
    })
  })

  test('Should return false if LoadLinkRepository returns null', async () => {
    const { sut, loadLinkRepositorySpy } = makeSut()
    loadLinkRepositorySpy.result = null
    const result = await sut.check(mockToken())
    expect(result).toBe(false)
  })

  test('Should return false if link is expired', async () => {
    const { sut, loadLinkRepositorySpy } = makeSut()
    loadLinkRepositorySpy.result.expiration = 1547982564066
    const result = await sut.check(mockToken())
    expect(result).toBe(false)
  })

  test('Should throw if LoadLinkRepository throws', async () => {
    const { sut, loadLinkRepositorySpy } = makeSut()
    jest.spyOn(loadLinkRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.check(mockToken())
    expect(promise).rejects.toThrow()
  })

  test('Should return true if token is valid', async () => {
    const { sut } = makeSut()
    const result = await sut.check(mockToken())
    expect(result).toBe(true)
  })
})

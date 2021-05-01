import { DbGeneratePasswordRecoveryLink } from '@/data/usecases'
import { LinkTypes } from '@/domain/models'
import { AddLinkRepositorySpy, MessagefySpy, SenderSpy } from '@/tests/data/mocks'
import { mockAccountModel, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbGeneratePasswordRecoveryLink,
  addLinkRepositorySpy: AddLinkRepositorySpy,
  messagefySpy: MessagefySpy,
  senderSpy: SenderSpy
}

const makeSut = (): SutTypes => {
  const addLinkRepositorySpy = new AddLinkRepositorySpy()
  const messagefySpy = new MessagefySpy()
  const senderSpy = new SenderSpy()
  const sut = new DbGeneratePasswordRecoveryLink(addLinkRepositorySpy, messagefySpy, senderSpy)
  return {
    sut,
    addLinkRepositorySpy,
    messagefySpy,
    senderSpy
  }
}

describe('DbGeneratePasswordRecoveryLink Usecase', () => {
  test('Should call AddLinkRepository with correct values', async () => {
    const { sut, addLinkRepositorySpy } = makeSut()
    const data = mockAccountModel()
    await sut.generate(data)
    expect(addLinkRepositorySpy.data).toEqual({
      type: LinkTypes.passwordRecovery,
      id: data.id
    })
  })

  test('Should throw if AddLinkRepository throws', async () => {
    const { sut, addLinkRepositorySpy } = makeSut()
    jest.spyOn(addLinkRepositorySpy, 'add').mockImplementation(throwError)
    const promise = sut.generate(mockAccountModel())
    expect(promise).rejects.toThrow()
  })

  test('Should call Messagefy with correct values', async () => {
    const { sut, addLinkRepositorySpy, messagefySpy } = makeSut()
    await sut.generate(mockAccountModel())
    expect(messagefySpy.data).toEqual(addLinkRepositorySpy.result)
  })

  test('Should throw if Messagefy throws', async () => {
    const { sut, messagefySpy } = makeSut()
    jest.spyOn(messagefySpy, 'create').mockImplementation(throwError)
    const promise = sut.generate(mockAccountModel())
    expect(promise).rejects.toThrow()
  })

  test('Should call Sender with correct values', async () => {
    const { sut, messagefySpy, senderSpy } = makeSut()
    await sut.generate(mockAccountModel())
    expect(senderSpy.model).toEqual(messagefySpy.result)
  })

  test('Should not return oon success', async () => {
    const { sut } = makeSut()
    const result = await sut.generate(mockAccountModel())
    expect(result).toBeFalsy()
  })
})

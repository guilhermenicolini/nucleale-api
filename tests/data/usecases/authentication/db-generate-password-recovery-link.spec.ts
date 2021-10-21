import { DbGeneratePasswordRecoveryLink } from '@/data/usecases'
import { LinkTypes } from '@/domain/models'
import { AddLinkRepositorySpy, MessagefySpy, SenderSpy, TimeManipulatorSpy } from '@/tests/data/mocks'
import { mockAccountModel, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbGeneratePasswordRecoveryLink,
  addLinkRepositorySpy: AddLinkRepositorySpy,
  messagefySpy: MessagefySpy,
  senderSpy: SenderSpy,
  timeManipulatorSpy: TimeManipulatorSpy
}

const makeSut = (): SutTypes => {
  const addLinkRepositorySpy = new AddLinkRepositorySpy()
  const messagefySpy = new MessagefySpy()
  const senderSpy = new SenderSpy()
  const timeManipulatorSpy = new TimeManipulatorSpy()
  const sut = new DbGeneratePasswordRecoveryLink(addLinkRepositorySpy,
    messagefySpy,
    senderSpy,
    'any_url',
    timeManipulatorSpy)
  return {
    sut,
    addLinkRepositorySpy,
    messagefySpy,
    senderSpy,
    timeManipulatorSpy
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
    const data = mockAccountModel()
    await sut.generate(data)
    expect(messagefySpy.data).toEqual({
      ...addLinkRepositorySpy.result,
      subject: 'Recuperação de Senha',
      name: data.name,
      email: data.email,
      phone: data.mobilePhone,
      link: `any_url/change-password/${addLinkRepositorySpy.result.link}`,
      request: 'any_date',
      expiration: 'any_date'
    })
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

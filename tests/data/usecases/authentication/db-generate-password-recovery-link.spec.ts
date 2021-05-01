import { DbGeneratePasswordRecoveryLink } from '@/data/usecases'
import { LinkTypes } from '@/domain/models'
import { AddLinkRepositorySpy, MessagefySpy, SenderSpy } from '@/tests/data/mocks'
import { mockAccountModel } from '@/tests/domain/mocks'

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
})

import { RemoteSendCertificate } from '@/data/usecases'
import { MessagefySpy, SenderSpy } from '@/tests/data/mocks'
import { mockFileModel, throwError } from '@/tests/domain/mocks'

const mockParam = (): RemoteSendCertificate.Model => ({
  email: 'mail@inbox.me',
  name: 'any_name',
  phone: '+5519998765432',
  file: mockFileModel()
})

type SutTypes = {
  sut: RemoteSendCertificate
  messagefySpy: MessagefySpy
  senderSpy: SenderSpy
}

const makeSut = (): SutTypes => {
  const messagefySpy = new MessagefySpy()
  const senderSpy = new SenderSpy()
  const sut = new RemoteSendCertificate(
    messagefySpy,
    senderSpy
  )

  return {
    sut,
    messagefySpy,
    senderSpy
  }
}

describe('RemoteSendCertificate Usecase', () => {
  test('Should call Messagefy with correct values', async () => {
    const { sut, messagefySpy } = makeSut()
    const params = mockParam()
    await sut.send(params)
    expect(messagefySpy.data).toEqual(params)
  })

  test('Should return error if Messagefy throws', async () => {
    const { sut, messagefySpy } = makeSut()
    jest.spyOn(messagefySpy, 'create').mockImplementationOnce(throwError)
    const promise = sut.send(mockParam())
    expect(promise).rejects.toThrow()
  })

  test('Should call Sender with correct values', async () => {
    const { sut, messagefySpy, senderSpy } = makeSut()
    await sut.send(mockParam())
    expect(senderSpy.model).toEqual(messagefySpy.result)
  })

  test('Should return error if Sender throws', async () => {
    const { sut, senderSpy } = makeSut()
    jest.spyOn(senderSpy, 'send').mockImplementationOnce(throwError)
    const promise = sut.send(mockParam())
    expect(promise).rejects.toThrow()
  })
})

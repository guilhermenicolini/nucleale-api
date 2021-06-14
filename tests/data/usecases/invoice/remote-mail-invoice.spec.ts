import { RemoteMailInvoice } from '@/data/usecases'
import { MessagefySpy, SenderSpy } from '@/tests/data/mocks'
import { mockPerson, mockXmlFileBuffer, throwError } from '@/tests/domain/mocks'

import faker from 'faker'

const mockParam = (): RemoteMailInvoice.Param => ({
  to: mockPerson(),
  invoiceNo: faker.datatype.number(),
  pdf: mockXmlFileBuffer()
})

type SutTypes = {
  sut: RemoteMailInvoice
  messagefySpy: MessagefySpy
  senderSpy: SenderSpy
}

const makeSut = (): SutTypes => {
  const messagefySpy = new MessagefySpy()
  const senderSpy = new SenderSpy()
  const sut = new RemoteMailInvoice(
    messagefySpy,
    senderSpy
  )

  return {
    sut,
    messagefySpy,
    senderSpy
  }
}

describe('RemoteMailInvoice Usecase', () => {
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

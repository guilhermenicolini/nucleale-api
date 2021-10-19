import { RemoteWhatsappSendMessage } from '@/data/usecases'
import {
  SenderSpy
} from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

const mockMessage = () => ({
  phone: faker.phone.phoneNumber('+55##9########'),
  text: faker.random.words(10)
})

type SutTypes = {
  sut: RemoteWhatsappSendMessage
  senderSpy: SenderSpy,
}

const makeSut = (): SutTypes => {
  const senderSpy = new SenderSpy()
  const sut = new RemoteWhatsappSendMessage(senderSpy
  )

  return {
    sut,
    senderSpy
  }
}

describe('RemoteWhatsappSendMessage Usecase', () => {
  test('Should call Sender with correct values', async () => {
    const { sut, senderSpy } = makeSut()
    const message = mockMessage()
    await sut.send(message)
    expect(senderSpy.model).toEqual(message)
  })

  test('Should throw if Sender throws', async () => {
    const { sut, senderSpy } = makeSut()
    jest.spyOn(senderSpy, 'send').mockImplementationOnce(throwError)
    const promise = sut.send(mockMessage())
    expect(promise).rejects.toThrow()
  })
})

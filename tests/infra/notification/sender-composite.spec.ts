import { MessageModel } from '@/domain/models'
import { SenderComposite } from '@/infra/notification'
import { SenderSpy } from '@/tests/data/mocks'

import faker from 'faker'

const mockData = (): MessageModel => ({
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  text: faker.random.words(5),
  html: faker.random.word()
})

type SutTypes = {
  sut: SenderComposite
  senderSpies: SenderSpy[]
}

const makeSut = (): SutTypes => {
  const senderSpies = [
    new SenderSpy(),
    new SenderSpy()
  ]
  const sut = new SenderComposite(senderSpies)
  return {
    sut,
    senderSpies
  }
}

describe('Sender Composite', () => {
  test('Should call all senders', () => {
    const { sut, senderSpies } = makeSut()
    const data = mockData()
    sut.send(data)

    expect(senderSpies[0].model).toEqual(data)
    expect(senderSpies[1].model).toEqual(data)
  })
})

import { MessageModel } from '@/domain/models'
import { SenderComposite } from '@/infra/notification'
import { SenderSpy } from '@/tests/data/mocks'

const mockData = (): MessageModel => ({
  email: 'mail@inbox.me',
  phone: '+5519998765432',
  text: 'any words',
  html: 'any'
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

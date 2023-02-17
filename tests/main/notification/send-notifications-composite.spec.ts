import { makeSendNotifications } from '@/main/factories'
import {
  SenderComposite,
  GmailSender
} from '@/infra/notification'
import { Sender } from '@/data/protocols'

jest.mock('@/infra/notification/sender-composite')

describe('SendNotifications Factory', () => {
  test('Should call SenderComposite with all senders', () => {
    makeSendNotifications()
    const senders: Sender[] = []
    senders.push(new GmailSender())
    expect(SenderComposite).toHaveBeenCalledWith(senders)
  })
})

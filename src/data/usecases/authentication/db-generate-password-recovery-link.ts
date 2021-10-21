import { GeneratePasswordRecoveryLink } from '@/domain/usecases'
import { AddLinkRepository, Messagefy, Sender, TimeManipulator } from '@/data/protocols'
import { LinkTypes } from '@/domain/models'

export class DbGeneratePasswordRecoveryLink implements GeneratePasswordRecoveryLink {
  constructor (
    private readonly addLinkRepository: AddLinkRepository,
    private readonly messagefy: Messagefy,
    private readonly sender: Sender,
    private readonly appUrl: string,
    private readonly timeManipulator: TimeManipulator
  ) { }

  async generate (account: GeneratePasswordRecoveryLink.Model): Promise<void> {
    const data = await this.addLinkRepository.add({
      type: LinkTypes.passwordRecovery,
      id: account.id
    })
    const message = await this.messagefy.create({
      name: account.name,
      email: account.email,
      phone: account.mobilePhone,
      link: `${this.appUrl}/change-password/${data.link}`,
      request: this.timeManipulator.toDateAndTime(new Date().valueOf()),
      expiration: this.timeManipulator.toDateAndTime(data.expiration)
    })
    this.sender.send(message)
  }
}

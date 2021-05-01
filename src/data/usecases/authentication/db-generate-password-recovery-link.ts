import { GeneratePasswordRecoveryLink } from '@/domain/usecases'
import { AddLinkRepository, Messagefy, Sender } from '@/data/protocols'
import { LinkTypes } from '@/domain/models'

export class DbGeneratePasswordRecoveryLink implements GeneratePasswordRecoveryLink {
  constructor (
    private readonly addLinkRepository: AddLinkRepository,
    private readonly messagefy: Messagefy,
    private readonly sender: Sender
  ) { }

  async generate (account: GeneratePasswordRecoveryLink.Model): Promise<void> {
    const data = await this.addLinkRepository.add({
      type: LinkTypes.passwordRecovery,
      id: account.id
    })
    const message = this.messagefy.create(data)
    this.sender.send(message)
  }
}

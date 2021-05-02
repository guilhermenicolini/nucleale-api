import { DbGeneratePasswordRecoveryLink } from '@/data/usecases'
import { GeneratePasswordRecoveryLink } from '@/domain/usecases'
import { LinkMongoRepository } from '@/infra/db'
import { PasswordRecoveryMessage, WhatsappSender } from '@/infra/notification'
import { MomentAdapter } from '@/infra/manipulation'
import env from '@/main/config/env'

export const makeDbGeneratePasswordRecoveryLink = (): GeneratePasswordRecoveryLink => {
  return new DbGeneratePasswordRecoveryLink(
    new LinkMongoRepository(),
    new PasswordRecoveryMessage(),
    new WhatsappSender(),
    env.appUrl,
    new MomentAdapter()
  )
}

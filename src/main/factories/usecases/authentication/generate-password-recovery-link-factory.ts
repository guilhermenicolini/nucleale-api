import { DbGeneratePasswordRecoveryLink } from '@/data/usecases'
import { GeneratePasswordRecoveryLink } from '@/domain/usecases'
import { LinkMongoRepository } from '@/infra/db'
import { PasswordRecoveryMessage } from '@/infra/notification'
import { HtmlMessagefyDecorator } from '@/main/decorators'
import { MomentAdapter } from '@/infra/manipulation'
import env from '@/main/config/env'
import { makeSendNotifications } from '@/main/factories'

export const makeDbGeneratePasswordRecoveryLink = (): GeneratePasswordRecoveryLink => {
  return new DbGeneratePasswordRecoveryLink(
    new LinkMongoRepository(),
    new HtmlMessagefyDecorator('mails/password-recovery/html', new PasswordRecoveryMessage()),
    makeSendNotifications(),
    env.appUrl,
    new MomentAdapter()
  )
}

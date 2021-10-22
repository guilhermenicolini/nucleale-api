import { GmailSender, InviteAccountMessage } from '@/infra/notification'
import { HtmlMessagefyDecorator } from '@/main/decorators'
import {
  makeInviteAccountValidation,
  makeDbLoadAccount,
  makeDbInviteAccount
} from '@/main/factories'
import { InviteAccountController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeInviteAccountController = (): Controller => {
  return new InviteAccountController(
    makeInviteAccountValidation(),
    makeDbLoadAccount(),
    makeDbInviteAccount(),
    new HtmlMessagefyDecorator('mails/invitation/html', new InviteAccountMessage()),
    new GmailSender())
}

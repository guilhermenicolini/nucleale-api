import {
  makeSendWhatsappMessageValidation
} from '@/main/factories'
import { SendWhatsappMessageController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeRemoteWhatsappSendMessage } from '../../usecases'

export const makeSendWhatsappMessageController = (): Controller => {
  return new SendWhatsappMessageController(
    makeSendWhatsappMessageValidation(),
    makeRemoteWhatsappSendMessage()
  )
}

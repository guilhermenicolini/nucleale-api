import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { serverError, badRequest, noContent } from '@/presentation/helpers'
import { SendMessage } from '@/domain/usecases'

export class SendWhatsappMessageController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly sendMessage: SendMessage
  ) { }

  async handle (httpRequest: SendWhatsappMessageController.Request): Promise<HttpResponse> {
    try {
      const request = {
        mobilePhone: httpRequest.mobilePhone,
        message: httpRequest.message
      }
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      await this.sendMessage.send(request)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SendWhatsappMessageController {
  export type Request = {
    mobilePhone: string
    message: string
  }
}

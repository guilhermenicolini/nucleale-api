import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, ok, handleError } from '@/presentation/helpers'
import { LoadAddressByZip } from '@/domain/usecases'

export class LoadAddressByZipController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadAddressByZip: LoadAddressByZip
  ) { }

  async handle (httpRequest: LoadAddressByZipController.Request): Promise<HttpResponse> {
    try {
      const request = {
        zip: httpRequest.zip
      }
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const address = await this.loadAddressByZip.load(request.zip)
      return ok(address)
    } catch (error) {
      return handleError(error)
    }
  }
}

export namespace LoadAddressByZipController {
  export type Request = {
    zip: string
  }
}

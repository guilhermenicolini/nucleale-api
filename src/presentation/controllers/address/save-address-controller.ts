import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { SaveAddress } from '@/domain/usecases'
import { badRequest, serverError, noContent } from '@/presentation/helpers'
import { } from '@/presentation/errors'
import { AddressModel } from '@/domain/models'

export class SaveAddressController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly saveAddress: SaveAddress
  ) { }

  async handle (request: SaveAddressController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const {
        accountId,
        address,
        number,
        complement,
        district,
        city,
        cityId,
        state,
        zip,
        country
      } = request

      await this.saveAddress.save({
        accountId,
        address,
        number,
        complement,
        district,
        city,
        cityId,
        state,
        zip,
        country
      })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SaveAddressController {
  export type Request = AddressModel
}

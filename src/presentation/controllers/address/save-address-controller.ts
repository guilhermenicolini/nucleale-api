import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { SaveAddress } from '@/domain/usecases'
import { badRequest, serverError, noContent } from '@/presentation/helpers'

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
  export type Request = {
    accountId: string
    address: string
    number: string
    complement?: string
    district: string
    city: string
    cityId: number
    state: string
    zip: string
    country: string
  }
}

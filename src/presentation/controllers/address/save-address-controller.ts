import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { SaveAddress } from '@/domain/usecases'
import { badRequest, serverError, noContent } from '@/presentation/helpers'

export class SaveAddressController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly saveAddress: SaveAddress
  ) { }

  async handle (httpRequest: SaveAddressController.Request): Promise<HttpResponse> {
    try {
      const request = {
        accountId: httpRequest.accountId,
        address: httpRequest.address,
        number: httpRequest.number,
        complement: httpRequest.complement,
        district: httpRequest.district,
        city: httpRequest.city,
        cityId: httpRequest.cityId,
        state: httpRequest.state,
        zip: httpRequest.zip,
        country: httpRequest.country
      }

      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      await this.saveAddress.save(request)

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

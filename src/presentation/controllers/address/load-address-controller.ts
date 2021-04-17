import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadAddress } from '@/domain/usecases'
import { serverError, ok } from '@/presentation/helpers'

export class LoadAddressController implements Controller {
  constructor (
    private readonly loadAddress: LoadAddress
  ) { }

  async handle (request: LoadAddressController.Request): Promise<HttpResponse> {
    try {
      const { accountId } = request
      const address = await this.loadAddress.load(accountId)
      return ok(address)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadAddressController {
  export type Request = {
    accountId: string
  }
}

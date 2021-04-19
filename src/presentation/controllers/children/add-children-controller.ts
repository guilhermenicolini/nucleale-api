import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { AddChildren } from '@/domain/usecases'
import { Gender } from '@/domain/models'
import { badRequest, serverError, created } from '@/presentation/helpers'

export class AddChildrenController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addChildren: AddChildren
  ) { }

  async handle (httpRequest: AddChildrenController.Request): Promise<HttpResponse> {
    try {
      const request = {
        accountId: httpRequest.accountId,
        name: httpRequest.name,
        birth: httpRequest.birth,
        gender: httpRequest.gender
      }

      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const id = await this.addChildren.add(request)
      return created({ id })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddChildrenController {
  export type Request = {
    accountId: string
    name: string
    birth: number
    gender: Gender
  }
}

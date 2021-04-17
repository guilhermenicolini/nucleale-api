import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { AddChildren } from '@/domain/usecases'
import { badRequest, serverError, created } from '@/presentation/helpers'

export class AddChildrenController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addChildren: AddChildren
  ) { }

  async handle (request: AddChildrenController.Request): Promise<HttpResponse> {
    try {
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
  export type Request = AddChildren.Params
}

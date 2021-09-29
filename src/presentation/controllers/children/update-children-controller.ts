import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { UpdateChildren } from '@/domain/usecases'
import { Gender } from '@/domain/models'
import { badRequest, serverError, notFound, noContent } from '@/presentation/helpers'
import { RecordNotFoundError } from '@/presentation/errors'

export class UpdateChildrenController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateChildren: UpdateChildren
  ) { }

  async handle (httpRequest: UpdateChildrenController.Request): Promise<HttpResponse> {
    try {
      const request = {
        accountId: httpRequest.accountId,
        id: httpRequest.id,
        name: httpRequest.name,
        birth: httpRequest.birth,
        gender: httpRequest.gender
      }

      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const result = await this.updateChildren.update(request)
      if (!result) {
        return notFound(new RecordNotFoundError('Filho não encontrado'))
      }

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateChildrenController {
  export type Request = {
    accountId: string
    id: string
    name: string
    birth: number
    gender: Gender
  }
}

import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, handleError } from '@/presentation/helpers'
import { LoadProcedures } from '@/domain/usecases'

export class LoadProceduresController implements Controller {
  constructor (
    private readonly loadProcedures: LoadProcedures
  ) { }

  async handle (): Promise<HttpResponse> {
    try {
      const procedures = await this.loadProcedures.loadAll()
      return ok(procedures)
    } catch (error) {
      return handleError(error)
    }
  }
}

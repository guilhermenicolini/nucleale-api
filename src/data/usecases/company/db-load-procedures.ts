import { LoadProcedures } from '@/domain/usecases'
import { LoadProceduresRepository } from '@/data/protocols'

export class DbLoadProcedures implements LoadProcedures {
  constructor (
    private readonly loadProceduresRepository: LoadProceduresRepository
  ) { }

  async loadAll (): Promise<LoadProceduresRepository.Result> {
    const procedures = await this.loadProceduresRepository.loadProcedures()
    return procedures || []
  }
}

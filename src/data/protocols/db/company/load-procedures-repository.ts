import { LoadProcedures } from '@/domain/usecases'

export interface LoadProceduresRepository {
  loadProcedures: () => Promise<LoadProceduresRepository.Result>
}

export namespace LoadProceduresRepository {
  export type Result = LoadProcedures.Result
}

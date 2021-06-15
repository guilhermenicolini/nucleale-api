import { ProcedureModel } from '@/domain/models'

export interface LoadProcedureRepository {
  loadProcedure: (procedureId: string) => Promise<LoadProcedureRepository.Result>
}

export namespace LoadProcedureRepository {
  export type Result = ProcedureModel
}

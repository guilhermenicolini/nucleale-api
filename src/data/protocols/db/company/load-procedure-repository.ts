import { ProcedureModel } from '@/domain/models'

export interface LoadProcedureRepository {
  load: (procedureId: string, companyId: string) => Promise<LoadProcedureRepository.Result>
}

export namespace LoadProcedureRepository {
  export type Result = ProcedureModel
}

import { ProcedureModel } from '@/domain/models'

export interface LoadProcedures {
  loadAll: () => Promise<LoadProcedures.Result>
}

export namespace LoadProcedures {
  export type Result = ProcedureModel[]
}

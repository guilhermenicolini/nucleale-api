import { ProcedureModel } from './procedure'

export type ServiceModel = {
    id: string
    name: string
    activity: string
    aliquote: number
    cnae: string
    operation: string
    pickupType: string
    service: string
    taxation: string
    taxable: boolean
    procedures: ProcedureModel[]
  }

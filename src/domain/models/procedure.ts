import { ServiceModel } from './service'

export type ProcedureModel = {
    id: string
    name: string
    description: string
    hours: number
    service: ServiceModel
  }

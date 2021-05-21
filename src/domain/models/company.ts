import { AddressModel } from './address'

export type RpsModel = {
  current: number
  serie: string
  type: string
}

export type SettingsModel = {
  serie: string
  rps: RpsModel
}

export type ProceduresModel = {
  id: string
  name: string
  description: string
}

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
}

export type CompanyModel = {
  id: string
  taxId: string
  registryId: string
  name: string
  mobilePhone: string
  address: AddressModel
  settings: SettingsModel
  services: ServiceModel[]
}

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

export type CompanyModel = {
  id: string
  taxId: string
  registryId: string
  name: string
  mobilePhone: string
  address: AddressModel
  settings: SettingsModel
}

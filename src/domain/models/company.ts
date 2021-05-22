import { AddressModel } from './address'

export type RpsModel = {
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
  address: Omit<AddressModel, 'id' | 'accountId'>
  settings: SettingsModel
}

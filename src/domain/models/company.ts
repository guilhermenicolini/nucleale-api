import { AddressModel } from './address'

export type RpsSettingsModel = {
  serie: string
  type: string
}

export type SettingsModel = {
  serie: string
  rps: RpsSettingsModel
}

export type CompanyModel = {
  id: string
  taxId: string
  registryId: string
  name: string
  mobilePhone: string
  email: string
  address: Omit<AddressModel, 'id' | 'accountId'>
  settings: SettingsModel
}

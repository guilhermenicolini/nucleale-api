import { AddressModel } from './address'

export type SettingsModel = {
  provideSerie: number
  rpsSerie: string
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

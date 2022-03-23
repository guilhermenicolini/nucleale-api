import { CompanyModel, SettingsModel, ServiceModel, ProcedureModel } from '@/domain/models'
import { ObjectId } from 'mongodb'

const mockSettings = (): SettingsModel => ({
  provideSerie: 99,
  rpsSerie: 'NF'
})

export const mockCompanyModel = (): CompanyModel => ({
  id: 'any_id',
  taxId: '71532915000196',
  registryId: '12345678',
  name: 'Company',
  mobilePhone: '+5519998765432',
  email: 'mail@inbox.me',
  address: {
    address: 'any_address',
    number: '1234',
    complement: 'any',
    district: 'any',
    city: 'any_city',
    cityId: 1234,
    state: 'SP',
    country: 'any_country',
    zip: '12345678'
  },
  settings: mockSettings()
})

const mockService = (): ServiceModel => ({
  id: 'any_id',
  name: 'any words',
  activity: 'any words',
  aliquote: 123,
  cnae: '123456789',
  operation: 'X',
  pickupType: 'X',
  service: 'any words',
  taxation: 'X',
  taxable: true,
  procedures: null
})

export const mockProcedureWithService = (): ProcedureModel => ({
  id: 'any_id',
  description: 'any words',
  name: 'any words',
  hours: 123,
  service: mockService()
})

export const mockDbProcedureWithoutService = () => ({
  _id: new ObjectId(),
  description: 'any words',
  name: 'any words',
  hours: 123
})

export const mockDbServiceWithProcedure = () => ({
  _id: new ObjectId(),
  name: 'any words',
  activity: 'any words',
  aliquote: 123,
  cnae: '123456789',
  operation: 'A',
  pickupType: 'R',
  service: 'any words',
  taxation: 'H',
  taxable: true,
  procedures: [mockDbProcedureWithoutService()]
})

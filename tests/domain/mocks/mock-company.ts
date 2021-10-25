import { CompanyModel, SettingsModel, ServiceModel, ProcedureModel } from '@/domain/models'
import faker from 'faker'
import { ObjectId } from 'mongodb'

const mockSettings = (): SettingsModel => ({
  provideSerie: 99,
  rpsSerie: 'NF'
})

export const mockCompanyModel = (): CompanyModel => ({
  id: faker.datatype.uuid(),
  taxId: faker.address.zipCode('##############'),
  registryId: faker.address.zipCode('########'),
  name: faker.company.companyName(),
  mobilePhone: faker.phone.phoneNumber('+55##9########'),
  email: faker.internet.email(),
  address: {
    address: faker.address.streetName(),
    number: faker.datatype.number(1000).toString(),
    complement: faker.random.word(),
    district: faker.random.word(),
    city: faker.address.city(),
    cityId: faker.datatype.number({ min: 1000, max: 9999 }),
    state: faker.address.stateAbbr(),
    country: faker.address.countryCode(),
    zip: faker.address.zipCode('########')
  },
  settings: mockSettings()
})

const mockService = (): ServiceModel => ({
  id: faker.datatype.uuid(),
  name: faker.random.words(2),
  activity: faker.random.words(4),
  aliquote: faker.datatype.number(),
  cnae: faker.address.zipCode('#########'),
  operation: 'X',
  pickupType: 'X',
  service: faker.random.words(3),
  taxation: 'X',
  taxable: true,
  procedures: null
})

export const mockProcedureWithService = (): ProcedureModel => ({
  id: faker.datatype.uuid(),
  description: faker.random.words(5),
  name: faker.random.words(2),
  hours: faker.datatype.number(),
  service: mockService()
})

export const mockDbProcedureWithoutService = () => ({
  _id: new ObjectId(),
  description: faker.random.words(5),
  name: faker.random.words(2),
  hours: faker.datatype.number()
})

export const mockDbServiceWithProcedure = () => ({
  _id: new ObjectId(),
  name: faker.random.words(2),
  activity: faker.random.words(4),
  aliquote: faker.datatype.number(),
  cnae: faker.address.zipCode('#########'),
  operation: 'A',
  pickupType: 'R',
  service: faker.random.words(3),
  taxation: 'H',
  taxable: true,
  procedures: [mockDbProcedureWithoutService()]
})

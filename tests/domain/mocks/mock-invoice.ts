import { InvoiceModel, InvoicePerson, InvoiceItem } from '@/domain/models'

import faker from 'faker'
import fs from 'fs'

export const mockInvoice = (): Omit<InvoiceModel, 'id'> => ({
  invoiceNo: faker.random.number({ min: 1, max: 999 }),
  invoiceDate: faker.date.past().getUTCMilliseconds(),
  issueDate: faker.date.past().getUTCMilliseconds(),
  verificationCode: faker.random.alphaNumeric(8),
  description: faker.random.words(3),
  invoiceValue: faker.random.float({ min: 100, max: 400, precision: 2 }),
  serviceValue: faker.random.float({ min: 100, max: 400, precision: 2 }),
  issValue: faker.random.float({ min: 100, max: 400, precision: 2 }),
  issAliquot: faker.random.float({ min: 1, max: 4, precision: 2 }),
  competence: faker.random.word(),
  pickupType: faker.random.word()[0].toUpperCase(),
  taxation: faker.random.word(),
  cnae: faker.random.word(),
  activity: faker.random.word(),
  service: faker.random.word(),
  serviceCity: faker.address.city(),
  serviceState: faker.address.stateAbbr(),
  provider: mockPerson(),
  taker: mockPerson(),
  items: [mockItem(), mockItem()]
})

export const mockPerson = (): InvoicePerson => ({
  taxId: faker.address.zipCode('###########'),
  name: faker.name.findName(),
  registryId: faker.address.zipCode('########'),
  address: faker.address.streetAddress(true),
  city: faker.address.city(),
  state: faker.address.stateAbbr(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber('+55##9########')
})

export const mockItem = (): InvoiceItem => ({
  taxable: faker.random.boolean(),
  description: faker.random.words(5),
  quantity: faker.random.number({ min: 1, max: 3 }),
  unitValue: faker.random.float({ min: 100, max: 400, precision: 2 }),
  totalValue: faker.random.float({ min: 100, max: 400, precision: 2 })
})

export const mockXmlBuffer = (): Buffer => fs.readFileSync('tests/main/mocks/mock.xml')

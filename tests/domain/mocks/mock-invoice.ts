import { InvoiceModel, InvoicePersonModel, InvoiceItemModel } from '@/domain/models'

import faker from 'faker'
import fs from 'fs'
import { ObjectId } from 'mongodb'

export const mockInvoice = (taxId?: string): Omit<InvoiceModel, 'id'> => ({
  invoiceNo: faker.datatype.number({ min: 1, max: 999 }),
  invoiceDate: faker.date.past().valueOf(),
  issueDate: faker.date.past().valueOf(),
  rpsNumber: faker.datatype.number({ min: 1, max: 99 }),
  verificationCode: faker.random.alphaNumeric(8),
  status: 'Normal',
  description: faker.random.words(3),
  invoiceValue: faker.datatype.float({ min: 100, max: 400, precision: 2 }),
  serviceValue: faker.datatype.float({ min: 100, max: 400, precision: 2 }),
  issValue: faker.datatype.float({ min: 100, max: 400, precision: 2 }),
  issAliquot: faker.datatype.float({ min: 1, max: 4, precision: 2 }),
  competence: faker.random.word(),
  pickupType: faker.random.word()[0].toUpperCase(),
  taxation: faker.random.word(),
  cnae: faker.random.word(),
  activity: faker.random.word(),
  service: faker.random.word(),
  serviceCity: faker.address.city(),
  serviceState: faker.address.stateAbbr(),
  provider: mockPerson(),
  taker: mockPerson(taxId),
  items: [mockItem(), mockItem()]
})

export const mockInvoiceDb = (taxId?: string): InvoiceModel => ({
  id: new ObjectId().toString(),
  invoiceNo: faker.datatype.number({ min: 1, max: 999 }),
  invoiceDate: 1619481600000,
  issueDate: 1619481600000,
  rpsNumber: faker.datatype.number({ min: 1, max: 99 }),
  verificationCode: faker.random.alphaNumeric(8),
  status: faker.random.word(),
  description: faker.random.words(3),
  invoiceValue: faker.datatype.float({ min: 100, max: 400, precision: 2 }),
  serviceValue: faker.datatype.float({ min: 100, max: 400, precision: 2 }),
  issValue: faker.datatype.float({ min: 100, max: 400, precision: 2 }),
  issAliquot: faker.datatype.float({ min: 1, max: 4, precision: 2 }),
  competence: faker.random.word(),
  pickupType: 'A',
  taxation: faker.random.word(),
  cnae: faker.random.word(),
  activity: faker.random.word(),
  service: faker.random.word(),
  serviceCity: faker.address.city(),
  serviceState: faker.address.stateAbbr(),
  provider: mockPerson(),
  taker: mockPerson(taxId),
  items: [mockItem(), mockItem()]
})

export const mockPerson = (taxId?: string): InvoicePersonModel => ({
  taxId: taxId || faker.address.zipCode('###########'),
  name: faker.name.findName(),
  registryId: faker.address.zipCode('########'),
  address: faker.address.streetAddress(true),
  city: faker.address.city(),
  state: faker.address.stateAbbr(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber('+55##9########')
})

export const mockItem = (): InvoiceItemModel => ({
  taxable: true,
  description: faker.random.words(5),
  quantity: faker.datatype.number({ min: 1, max: 3 }),
  unitValue: faker.datatype.float({ min: 100, max: 400, precision: 2 }),
  totalValue: faker.datatype.float({ min: 100, max: 400, precision: 2 })
})

export const mockXmlFileBuffer = (): any => ({
  fieldname: faker.system.commonFileName('xml'),
  buffer: fs.readFileSync('tests/main/mocks/mock.xml')
})

export const mockLoadInvoice = (): Pick<InvoiceModel, 'id' | 'invoiceNo' | 'invoiceDate' | 'description'> => ({
  id: faker.datatype.uuid(),
  invoiceNo: faker.datatype.number({ min: 1, max: 999 }),
  invoiceDate: faker.date.past().getUTCMilliseconds(),
  description: faker.random.words(3)
})

export const mockDownloadRequest = () => ({
  id: new ObjectId().toString(),
  accountId: new ObjectId().toString()
})

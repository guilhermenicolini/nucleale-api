import { InvoiceModel, InvoicePersonModel, InvoiceItemModel } from '@/domain/models'

import fs from 'fs'
import { ObjectId } from 'mongodb'
import { mockAddAddressModel } from './mock-address'

export const mockInvoice = (taxId?: string): Omit<InvoiceModel, 'id'> => ({
  invoiceNo: 1234,
  invoiceDate: 315543600000,
  issueDate: 315543600000,
  rpsNumber: 12,
  rpsSerie: 'ab',
  provideSerie: 12,
  verificationCode: 'abcd1234',
  status: 'Normal',
  description: 'any words',
  invoiceValue: 123.45,
  serviceValue: 123.45,
  issValue: 123.45,
  issAliquot: 123.45,
  competence: 'any',
  pickupType: 'any'[0].toUpperCase(),
  taxation: 'any',
  operation: 'any'[0].toUpperCase(),
  cnae: 'any',
  activity: 'any',
  service: 'any',
  serviceCity: 'any_city',
  serviceState: 'SP',
  provider: mockPerson(),
  taker: mockPerson(taxId),
  items: [mockItem(), mockItem()]
})

export const mockInvoiceDb = (taxId?: string): InvoiceModel => ({
  id: new ObjectId().toString(),
  invoiceNo: 123,
  invoiceDate: 1619481600000,
  issueDate: 1619481600000,
  rpsNumber: 12,
  rpsSerie: 'ab',
  provideSerie: 12,
  verificationCode: 'abcd1234',
  status: 'any',
  description: 'any words',
  invoiceValue: 123.45,
  serviceValue: 123.45,
  issValue: 123.45,
  issAliquot: 123.45,
  competence: 'any',
  pickupType: 'A',
  taxation: 'any',
  operation: 'any'[0].toUpperCase(),
  cnae: 'any',
  activity: 'any',
  service: 'any',
  serviceCity: 'any_city',
  serviceState: 'SP',
  provider: mockPerson(),
  taker: mockPerson(taxId),
  items: [mockItem(), mockItem()]
})

export const mockPerson = (taxId?: string): InvoicePersonModel => ({
  taxId: taxId || '12345678901',
  name: 'any_name',
  registryId: '12345678',
  address: mockAddAddressModel(),
  email: 'mail@inbox.me',
  phone: '+5519998765432'
})

export const mockItem = (): InvoiceItemModel => ({
  taxable: true,
  description: 'any words',
  quantity: 1,
  unitValue: 123.45,
  totalValue: 123.45
})

export const mockXmlFileBuffer = (): any => ({
  fieldname: 'file.xml',
  buffer: fs.readFileSync('tests/main/mocks/mock.xml')
})

export const mockLoadInvoice = (): Pick<InvoiceModel, 'id' | 'invoiceNo' | 'invoiceDate' | 'description' | 'invoiceValue'> => ({
  id: 'any_id',
  invoiceNo: 123,
  invoiceDate: 315543600000,
  invoiceValue: 123.45,
  description: 'any words'
})

export const mockDownloadRequest = () => ({
  iId: 123,
  accountId: new ObjectId().toString()
})

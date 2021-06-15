import { AddressModel } from '@/domain/models'

export type InvoicePersonModel = {
  taxId: string
  name: string
  registryId: string
  address: Omit<AddressModel, 'id' | 'accountId'>
  email: string
  phone: string
}

export type InvoiceItemModel = {
  taxable: boolean
  description: string
  quantity: number
  unitValue: number
  totalValue: number
}

export type InvoiceModel = {
  id: string
  invoiceNo: number
  invoiceDate: number
  issueDate: number
  rpsNumber: number
  rpsSerie: string
  provideSerie: number
  verificationCode: string
  status: string
  description: string
  invoiceValue: number
  serviceValue: number
  issValue: number
  issAliquot: number
  competence: string
  pickupType: string
  taxation: string
  operation: string
  cnae: string
  activity: string
  service: string
  serviceCity: string
  serviceState: string
  provider: InvoicePersonModel
  taker: InvoicePersonModel
  items: InvoiceItemModel[]
}

export type InvoicePerson = {
  taxId: string
  name: string
  registryId: string
  address: string
  city: string
  state: string
  email: string
  phone: string
}

export type InvoiceItem = {
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
  verificationCode: string
  description: string
  invoiceValue: number
  serviceValue: number
  issValue: number
  issAliquot: number
  competence: string
  pickupType: string
  taxation: string
  cnae: string
  activity: string
  service: string
  serviceCity: string
  serviceState: string
  provider: InvoicePerson
  taker: InvoicePerson
  items: InvoiceItem[]
}

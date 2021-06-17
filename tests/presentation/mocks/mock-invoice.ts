import {
  LoadInvoicesFromBuffer,
  SaveInvoice,
  LoadInvoices,
  LoadInvoice,
  GenerateInvoice,
  CreateInvoice,
  SendInvoice,
  MailInvoice,
  LoadInvoiceByNumber
} from '@/domain/usecases'
import { mockInvoice, mockLoadInvoice, mockInvoiceDb } from '@/tests/domain/mocks'

import faker from 'faker'

export class LoadInvoicesFromBufferSpy implements LoadInvoicesFromBuffer {
  buffer: Buffer
  result: LoadInvoicesFromBuffer.Result = [mockInvoice(), mockInvoice()]

  async load (buffer: Buffer): Promise<LoadInvoicesFromBuffer.Result> {
    this.buffer = buffer
    return this.result
  }
}

export class SaveInvoiceSpy implements SaveInvoice {
  param: SaveInvoice.Param

  async save (param: SaveInvoice.Param): Promise<void> {
    this.param = param
  }
}

export class LoadInvoicesSpy implements LoadInvoices {
  accountId: string
  result: LoadInvoices.Result = [
    mockLoadInvoice(),
    mockLoadInvoice()
  ]

  async load (accountId: string): Promise<LoadInvoices.Result> {
    this.accountId = accountId
    return this.result
  }
}

export class LoadInvoiceSpy implements LoadInvoice {
  id: string
  accountId: string
  result: LoadInvoice.Result = mockInvoiceDb()

  async load (id: string, accountId: string): Promise<LoadInvoice.Result> {
    this.id = id
    this.accountId = accountId
    return this.result
  }
}

export class GenerateInvoiceSpy implements GenerateInvoice {
  model: GenerateInvoice.Model
  result: GenerateInvoice.Result = {
    fileName: faker.system.commonFileName('pdf'),
    buffer: {}
  }

  async generate (model: GenerateInvoice.Model): Promise<GenerateInvoice.Result> {
    this.model = model
    return this.result
  }
}

export class CreateInvoiceSpy implements CreateInvoice {
  params: CreateInvoice.Params
  result: CreateInvoice.Result = mockInvoiceDb()

  async create (params: CreateInvoice.Params): Promise<CreateInvoice.Result> {
    this.params = params
    return this.result
  }
}

export class SendInvoiceSpy implements SendInvoice {
  params: SendInvoice.Params
  result: SendInvoice.Result = {
    invoiceNo: faker.datatype.number(),
    verificationCode: faker.random.alphaNumeric(20)
  }

  async send (params: SendInvoice.Params): Promise<SendInvoice.Result> {
    this.params = params
    return this.result
  }
}

export class MailInvoiceSpy implements MailInvoice {
  param: MailInvoice.Param

  async send (param: MailInvoice.Param): Promise<void> {
    this.param = param
  }
}

export class LoadInvoiceByNumberSpy implements LoadInvoiceByNumber {
  invoiceNo: number
  result: LoadInvoiceByNumber.Result = mockInvoiceDb()

  async loadByNumber (invoiceNo: number): Promise<LoadInvoiceByNumber.Result> {
    this.invoiceNo = invoiceNo
    return this.result
  }
}

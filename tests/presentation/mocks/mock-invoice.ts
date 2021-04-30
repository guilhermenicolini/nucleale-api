import {
  LoadInvoicesFromBuffer,
  SaveInvoice,
  LoadInvoices,
  LoadInvoice,
  GenerateInvoice
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
    pdf: {}
  }

  async generate (model: GenerateInvoice.Model): Promise<GenerateInvoice.Result> {
    this.model = model
    return this.result
  }
}

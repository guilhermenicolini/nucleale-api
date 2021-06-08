import { ObjectConverter } from '@/data/protocols/convertion'
import { CreateInvoice, SendInvoice } from '@/domain/usecases'
import { mockInvoiceDb, mockRpsLoteModel } from '@/tests/domain/mocks'

export class ModelsToInvoiceConverterSpy implements ObjectConverter<CreateInvoice.ModelToInvoiceInput, CreateInvoice.Result> {
  data: CreateInvoice.ModelToInvoiceInput
  result: CreateInvoice.Result = mockInvoiceDb()

  async convert (data: CreateInvoice.ModelToInvoiceInput): Promise<CreateInvoice.Result> {
    this.data = data
    return this.result
  }
}

export class InvoiceToRpsConverterSpy implements ObjectConverter<SendInvoice.Params, SendInvoice.Rps> {
  data: SendInvoice.Params
  result: SendInvoice.Rps = mockRpsLoteModel()

  async convert (data: SendInvoice.Params): Promise<SendInvoice.Rps> {
    this.data = data
    return this.result
  }
}

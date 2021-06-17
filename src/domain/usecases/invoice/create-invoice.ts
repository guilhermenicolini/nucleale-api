import { AccountModel, AddressModel, CompanyModel, InvoiceModel, ProcedureModel } from '@/domain/models'

export interface CreateInvoice {
  create: (params: CreateInvoice.Params) => Promise<CreateInvoice.Result>
}

export namespace CreateInvoice {
  export type Params = {
    userId: string
    procedureId: string
    amount: number
    data: string | string[]
  }
  export type Result = Omit<InvoiceModel, 'id'> | Error
  export type ModelToInvoiceInput = {
    account: Omit<AccountModel, 'password'>
    address: AddressModel
    company: CompanyModel
    procedure: ProcedureModel
    rpsNumber: number
    amount: number
    data: string | string[]
  }
}

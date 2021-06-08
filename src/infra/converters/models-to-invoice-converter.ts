import { StringManipulator, TimeManipulator } from '@/data/protocols'
import { ObjectConverter } from '@/data/protocols/convertion'
import { AccountModel, AddressModel, CompanyModel, InvoiceModel, InvoiceStatus, ProcedureModel } from '@/domain/models'

export class ModelsToInvoiceConverter implements ObjectConverter<ModelsToInvoiceConverter.Input, ModelsToInvoiceConverter.Output> {
  constructor (
    private readonly stringManipulator: StringManipulator,
    private readonly timeManipulator: TimeManipulator
  ) {}

  async convert (data: ModelsToInvoiceConverter.Input): Promise<ModelsToInvoiceConverter.Output> {
    const today = new Date().valueOf()
    return {
      id: null,
      invoiceNo: null,
      invoiceDate: today,
      issueDate: today,
      rpsNumber: data.rpsNumber,
      rpsSerie: data.company.settings.rps.serie,
      verificationCode: null,
      status: InvoiceStatus.normal,
      description: this.stringManipulator.normalize(this.stringManipulator.format(data.procedure.description, data.data)).toUpperCase(),
      invoiceValue: data.amount,
      serviceValue: data.amount,
      issValue: data.amount * data.procedure.service.aliquote,
      issAliquot: data.procedure.service.aliquote,
      competence: this.timeManipulator.toMonthAndYear(today),
      pickupType: data.procedure.service.pickupType,
      taxation: data.procedure.service.taxation,
      cnae: data.procedure.service.cnae,
      activity: this.stringManipulator.normalize(data.procedure.service.activity).toUpperCase(),
      service: data.procedure.service.service,
      serviceCity: this.stringManipulator.normalize(data.company.address.city).toUpperCase(),
      serviceState: data.company.address.state,
      provider: {
        taxId: data.company.taxId,
        name: this.stringManipulator.normalize(data.company.name).toUpperCase(),
        registryId: data.company.registryId,
        address: {
          address: this.stringManipulator.normalize(data.company.address.address).toUpperCase(),
          number: data.company.address.number,
          complement: data.company.address.complement ? this.stringManipulator.normalize(data.company.address.complement).toUpperCase() : null,
          district: this.stringManipulator.normalize(data.company.address.district).toUpperCase(),
          city: this.stringManipulator.normalize(data.company.address.city).toUpperCase(),
          cityId: data.company.address.cityId,
          state: data.company.address.state,
          zip: data.company.address.zip,
          country: data.company.address.country
        },
        email: data.company.email,
        phone: data.company.mobilePhone
      },
      taker: {
        taxId: data.account.taxId,
        name: this.stringManipulator.normalize(data.account.name).toUpperCase(),
        registryId: data.account.registryId,
        address: {
          address: this.stringManipulator.normalize(data.address.address).toUpperCase(),
          number: data.address.number,
          complement: data.address.complement ? this.stringManipulator.normalize(data.address.complement).toUpperCase() : null,
          district: this.stringManipulator.normalize(data.address.district).toUpperCase(),
          city: this.stringManipulator.normalize(data.address.city).toUpperCase(),
          cityId: data.address.cityId,
          state: data.address.state,
          zip: data.address.zip,
          country: data.address.country
        },
        email: data.account.email,
        phone: data.account.mobilePhone
      },
      items: [
        {
          taxable: data.procedure.service.taxable,
          description: this.stringManipulator.normalize(data.procedure.service.name).toUpperCase(),
          quantity: 1,
          unitValue: data.amount,
          totalValue: data.amount
        }
      ]
    }
  }
}

export namespace ModelsToInvoiceConverter {
    export type Input = {
      account: Omit<AccountModel, 'password'>
      address: AddressModel
      company: CompanyModel
      procedure: ProcedureModel
      rpsNumber: number
      amount: number
      data: string | string[]
    }
    export type Output = InvoiceModel
  }

import {
  ObjectConverter,
  TimeManipulator,
  MoneyManipulator,
  MaskManipulator
} from '@/data/protocols'
import { InvoiceModel } from '@/domain/models'

export class InvoicePdfMessageConverter implements ObjectConverter<InvoiceModel, any> {
  constructor (
    private readonly timeManipulator: TimeManipulator,
    private readonly moneyManipulator: MoneyManipulator,
    private readonly maskManipulator: MaskManipulator
  ) { }

  convert (invoice: InvoiceModel): any {
    const phone = invoice.taker.phone.replace('+55', '')
    const phoneMask = `(00) ${phone.length === 9 ? '0' : ''}0000-0000`
    const message = {
      invoiceNo: invoice.invoiceNo.toString().padStart(8, '0'),
      invoiceDate: this.timeManipulator.toDateAndTime(invoice.invoiceDate),
      invoiceValue: this.moneyManipulator.format(invoice.invoiceValue),
      verificationCode: invoice.verificationCode.substring(0, 8),
      name: invoice.taker.name,
      taxId: this.maskManipulator.mask(invoice.taker.taxId, '000.000.000-00'),
      registryId: null,
      address: `${invoice.taker.address.address}, Nº ${invoice.taker.address.number}${invoice.taker.address.complement
        ? ' ' + invoice.taker.address.complement
        : ''
      } - BAIRRO ${invoice.taker.address.district} - CEP: ${this.maskManipulator.mask(invoice.taker.address.zip, '00000-000')
      }`,
      city: invoice.taker.address.city,
      state: invoice.taker.address.state,
      email: invoice.taker.email,
      phone: this.maskManipulator.mask(phone, phoneMask),
      description: invoice.description,
      items: invoice.items.map((i) => {
        return {
          taxable: i.taxable ? 'Sim' : 'Não',
          description: i.description,
          qty: i.quantity,
          unitValue: this.moneyManipulator.format(i.unitValue),
          totalValue: this.moneyManipulator.format(i.totalValue)
        }
      }),
      serviceValue:
        invoice.issAliquot !== 0 ? this.moneyManipulator.format(invoice.serviceValue) : '***',
      issAliquot: invoice.issAliquot !== 0 ? this.moneyManipulator.format(invoice.issAliquot) : '***',
      issValue: invoice.issAliquot !== 0 ? this.moneyManipulator.format(invoice.issValue) : '***',
      competence: invoice.competence,
      serviceLocation: `${invoice.serviceCity}/${invoice.serviceState}`,
      pickup:
        invoice.pickupType === 'A'
          ? 'ISS A RECOLHER PELO PRESTADOR'
          : 'ISS RETIDO NA FONTE PELO TOMADOR',
      cnae: invoice.cnae,
      activity: invoice.activity,
      service: invoice.service,
      retroactive:
        this.timeManipulator.toDay(invoice.invoiceDate) !==
          this.timeManipulator.toDay(invoice.issueDate)
          ? `NFSe gerada em ${this.timeManipulator.toDate(invoice.invoiceDate)}, com data de emissão retroativa à ${this.timeManipulator.toDate(invoice.issueDate)}`
          : null
    }

    return message
  }
}

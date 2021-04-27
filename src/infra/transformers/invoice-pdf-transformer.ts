import { Converter, Transformer } from '@/data/protocols'
import { InvoiceModel } from '@/domain/models'
import { toBRMoney } from '@/infra/utils'

import moment from 'moment-timezone'

export class NfseTransformer implements Transformer<Omit<InvoiceModel, 'id' | 'provider' | 'taker' | 'items'>> {
  constructor (
    private readonly taxIdMasker: Converter,
    private readonly phoneMasker: Converter
  ) { }

  transform (invoice: InvoiceModel): any {
    const message = {
      invoiceNo: invoice.invoiceNo.toString().padStart(8, '0'),
      invoiceDate: moment(invoice.invoiceDate).format('DD/MM/YYYY HH:mm:ss'),
      invoiceValue: toBRMoney(invoice.invoiceValue),
      verificationCode: invoice.verificationCode.substring(0, 8),
      name: invoice.taker.name,
      taxId: this.taxIdMasker.convert(invoice.taker.taxId),
      registryId: null,
      address: invoice.taker.address,
      city: invoice.taker.city,
      state: invoice.taker.state,
      email: invoice.taker.email,
      phone: this.phoneMasker.convert(invoice.taker.phone),
      description: invoice.description,
      items: invoice.items.map((i) => {
        return {
          taxable: i.taxable ? 'Sim' : 'Não',
          description: i.description,
          qty: i.quantity,
          unitValue: toBRMoney(i.unitValue),
          totalValue: toBRMoney(i.totalValue)
        }
      }),
      serviceValue:
        invoice.issAliquot !== 0 ? toBRMoney(invoice.serviceValue) : '***',
      issAliquot: invoice.issAliquot !== 0 ? toBRMoney(invoice.issAliquot) : '***',
      issValue: invoice.issAliquot !== 0 ? toBRMoney(invoice.issValue) : '***',
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
        moment(invoice.invoiceDate).format('DD') !==
          moment(invoice.issueDate).format('DD')
          ? `NFSe gerada em ${moment(invoice.invoiceDate).format(
            'DD/MM/YYYY'
          )}, com data de emissão retroativa à ${moment(
            invoice.issueDate
          ).format('DD/MM/YYYY')}`
          : null
    }

    return message
  }
}

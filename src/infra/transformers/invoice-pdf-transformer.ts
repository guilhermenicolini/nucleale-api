import { Transformer } from '@/data/protocols'
import { InvoiceModel } from '@/domain/models'
import { } from '@/infra/utils'
import moment from 'moment-timezone'

const toBR = (value) => value.toFixed(2).replace('.', ',')

export class NfseTransformer implements Transformer<Omit<InvoiceModel, 'id' | 'provider' | 'taker' | 'items'>> {
  transform (invoice: InvoiceModel): any {
    // const taxIdMask =
    //  invoice.taker.taxId.length === 11
    //    ? '000.000.000-00'
    //    : '00.000.000/0000-00'

    // const phoneMask = '(00) 00000-0000'

    const message = {
      invoiceNo: invoice.invoiceNo.toString().padStart(8, '0'),
      invoiceDate: moment(invoice.invoiceDate).format('DD/MM/YYYY HH:mm:ss'),
      invoiceValue: toBR(invoice.invoiceValue),
      verificationCode: invoice.verificationCode.substring(0, 8),
      name: invoice.taker.name,
      // taxId: new StringMask(taxIdMask).apply(invoice.taker.taxId),
      registryId: null,
      address: invoice.taker.address,
      city: invoice.taker.city,
      state: invoice.taker.state,
      email: invoice.taker.email,
      // phone: new StringMask(phoneMask).apply(invoice.taker.phone),
      description: invoice.description,
      items: invoice.items.map((i) => {
        return {
          taxable: i.taxable ? 'Sim' : 'Não',
          description: i.description,
          qty: i.quantity,
          unitValue: toBR(i.unitValue),
          totalValue: toBR(i.totalValue)
        }
      }),
      serviceValue:
        invoice.issAliquot !== 0 ? toBR(invoice.serviceValue) : '***',
      issAliquot: invoice.issAliquot !== 0 ? toBR(invoice.issAliquot) : '***',
      issValue: invoice.issAliquot !== 0 ? toBR(invoice.issValue) : '***',
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

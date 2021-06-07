import { Transformer } from '@/data/protocols'
import { InvoicePersonModel } from '@/domain/models'
import { hasValue, trimZeros } from '@/infra/utils'

export class NfsePersonTransformer implements Transformer<any> {
  constructor (
    private readonly prop: string,
    private readonly tag: string,
    private readonly prefix: string
  ) { }

  transform (data: any): any {
    const person: InvoicePersonModel = {
      taxId: data[`${this.tag}_CPF_CNPJ`],
      name: data[`${this.tag}_RAZAO_SOCIAL`].toUpperCase(),
      registryId: data[`${this.tag}_INSCRICAO_MUNICIPAL`],
      address: {
        address: `${hasValue(data[`${this.tag}_TIPO_LOGRADOURO`])
        ? data[`${this.tag}_TIPO_LOGRADOURO`].toUpperCase() + ' '
        : ''
        }${data[`${this.tag}_LOGRADOURO`].toUpperCase()}`,
        number: trimZeros(data[`${this.tag}${this.prefix ? '_' + this.prefix : ''}_NUMERO`]),
        complement: hasValue(data[`${this.tag}_COMPLEMENTO`]) ? data[`${this.tag}_COMPLEMENTO`].toUpperCase() : null,
        district: data[`${this.tag}_BAIRRO`].toUpperCase(),
        cityId: parseInt(data[`${this.tag}_CIDADE_CODIGO`]),
        city: data[`${this.tag}_CIDADE`].toUpperCase(),
        state: data[`${this.tag}_UF`].toUpperCase(),
        zip: data[`${this.tag}_CEP`],
        country: 'BR'
      },
      email: data[`${this.tag}_EMAIL`],
      phone: `+55${data[`${this.tag}_DDD_TELEFONE`]}${data[`${this.tag}_TELEFONE`]}`
    }

    return {
      [this.prop]: person
    }
  }
}

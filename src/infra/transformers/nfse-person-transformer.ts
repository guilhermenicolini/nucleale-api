import { Transformer, MaskManipulator } from '@/data/protocols'
import { InvoicePersonModel } from '@/domain/models'
import { hasValue } from '@/infra/utils'

export class NfsePersonTransformer implements Transformer<any> {
  constructor (
    private readonly prop: string,
    private readonly tag: string,
    private readonly prefix: string = null,
    private readonly maskManipulator: MaskManipulator
  ) { }

  transform (data: any): any {
    const phone = data[`${this.tag}_DDD_TELEFONE`] + data[`${this.tag}_TELEFONE`]
    const phoneMask = `(00) ${data[`${this.tag}_TELEFONE`].length === 9 ? '0' : ''}0000-0000`
    const person: InvoicePersonModel = {
      taxId: data[`${this.tag}_CPF_CNPJ`],
      name: data[`${this.tag}_RAZAO_SOCIAL`].toUpperCase(),
      registryId: data[`${this.tag}_INSCRICAO_MUNICIPAL`],
      address: `${hasValue(data[`${this.tag}_TIPO_LOGRADOURO`])
        ? data[`${this.tag}_TIPO_LOGRADOURO`].toUpperCase() + ' '
        : ''
        }${data[`${this.tag}_LOGRADOURO`].toUpperCase()}, Nº ${data[`${this.tag}${this.prefix ? '_' + this.prefix : ''}_NUMERO`]}${hasValue(data[`${this.tag}_COMPLEMENTO`])
          ? ' ' + data[`${this.tag}_COMPLEMENTO`].toUpperCase()
          : ''
        } - BAIRRO ${data[`${this.tag}_BAIRRO`].toUpperCase()} - CEP: ${this.maskManipulator.mask(data[`${this.tag}_CEP`], '00000-000')
        }`,
      city: data[`${this.tag}_CIDADE`].toUpperCase(),
      state: data[`${this.tag}_UF`].toUpperCase(),
      email: data[`${this.tag}_EMAIL`],
      phone: this.maskManipulator.mask(phone, phoneMask)
    }

    return {
      [this.prop]: person
    }
  }
}

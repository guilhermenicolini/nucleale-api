import { Transformer } from '@/data/protocols'

export class NfsePersonTransformer implements Transformer<any> {
  constructor (
    private readonly prop: string,
    private readonly tag: string,
    private readonly prefix: string = null
  ) { }

  transform (data: any): any {
    return {
      [this.prop]: {
        taxId: data[`${this.tag}_CPF_CNPJ`],
        name: data[`${this.tag}_RAZAO_SOCIAL`].toUpperCase(),
        registryId: data[`${this.tag}_INSCRICAO_MUNICIPAL`],
        address: `${data[`${this.tag}_TIPO_LOGRADOURO`]
          ? data[`${this.tag}_TIPO_LOGRADOURO`].toUpperCase() + ' '
          : ''
          }${data[`${this.tag}_LOGRADOURO`].toUpperCase()}, Nº ${data[`${this.tag}${this.prefix ? '_' + this.prefix : ''}_NUMERO`]}${data[`${this.tag}_COMPLEMENTO`]
            ? ' ' + data[`${this.tag}_COMPLEMENTO`].toUpperCase()
            : ''
          } - BAIRRO ${data[`${this.tag}_BAIRRO`].toUpperCase()} - CEP: ${data[`${this.tag}_CEP`]
          }`,
        city: data[`${this.tag}_CIDADE`].toUpperCase(),
        state: data[`${this.tag}_UF`].toUpperCase(),
        email: data[`${this.tag}_EMAIL`],
        phone: `(${data[`${this.tag}_DDD_TELEFONE`]}) ${data[`${this.tag}_TELEFONE`]}`
      }
    }
  }
}

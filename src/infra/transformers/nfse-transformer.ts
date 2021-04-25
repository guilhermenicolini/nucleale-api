import { Transformer } from '@/data/protocols'
import { InvoiceModel } from '@/domain/models'
import { removeTextCharacters, parseMoney, hasValue } from '@/infra/utils'
import moment from 'moment-timezone'

export class NfseTransformer implements Transformer<Omit<InvoiceModel, 'id' | 'provider' | 'taker' | 'items'>> {
  transform (data: any): Omit<InvoiceModel, 'id' | 'provider' | 'taker' | 'items'> {
    const invoiceDate = moment(data.DATA_HORA_EMISSAO, 'DD/MM/YYYY HH:mm:ss')
    const issueDate = moment(
      `${data.DIA_EMISSAO}${invoiceDate.format('/MM/YYYY')}`,
      'DD/MM/YYYY'
    )

    return {
      invoiceNo: parseInt(data.NUM_NOTA),
      invoiceDate: invoiceDate.valueOf(),
      issueDate: issueDate.valueOf(),
      verificationCode: data.CODIGO_VERIFICACAO,
      description: hasValue(data.DESCRICAO_NOTA) ? removeTextCharacters(data.DESCRICAO_NOTA.toUpperCase()) : null,
      invoiceValue: parseMoney(data.VALOR_NOTA),
      serviceValue: parseMoney(data.VALOR_SERVICO),
      issValue: parseMoney(data.VALOR_ISS),
      issAliquot: parseMoney(data.ALIQUOTA),
      competence: data.MES_COMPETENCIA,
      pickupType: data.TIPO_RECOLHIMENTO,
      taxation: data.TRIBUTACAO_PRESTACAO,
      cnae: data.CODIGO_ATIVIDADE,
      activity: data.DESCRICAO_ATIVIDADE,
      service: data.DESCRICAO_SERVICO,
      serviceCity: data.CIDADE_PRESTACAO.toUpperCase(),
      serviceState: data.UF_PRESTACAO.toUpperCase()
    }
  }
}

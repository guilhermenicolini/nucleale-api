import { Transformer, TimeManipulator } from '@/data/protocols'
import { InvoiceModel } from '@/domain/models'
import { removeTextCharacters, parseMoney, hasValue } from '@/infra/utils'

export class NfseTransformer implements Transformer<Omit<InvoiceModel, 'id' | 'provider' | 'taker' | 'items'>> {
  constructor (
    private readonly timeManipulator: TimeManipulator
  ) { }

  transform (data: any): Omit<InvoiceModel, 'id' | 'provider' | 'taker' | 'items'> {
    const invoiceDate = this.timeManipulator.fromDateAndTime(data.DATA_HORA_EMISSAO)
    const invoiceMonth = this.timeManipulator.toMonthAndYear(invoiceDate)
    const issueDate = this.timeManipulator.fromDate(`${data.DIA_EMISSAO}${invoiceMonth}`)

    return {
      invoiceNo: parseInt(data.NUM_NOTA),
      invoiceDate: invoiceDate.valueOf(),
      issueDate: issueDate.valueOf(),
      verificationCode: data.CODIGO_VERIFICACAO,
      status: data.SITUACAO_NF,
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

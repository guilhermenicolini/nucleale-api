import { Hasher, PhoneManipulator, TimeManipulator } from '@/data/protocols'
import { ObjectConverter } from '@/data/protocols/convertion'
import { InvoiceModel, RpsLoteModel } from '@/domain/models'
import env from '@/main/config/env'

export class InvoiceToRpsConverter implements ObjectConverter<InvoiceToRpsConverter.Input, InvoiceToRpsConverter.Output> {
  constructor (
    private readonly timeManipulator: TimeManipulator,
    private readonly phoneManipulator: PhoneManipulator,
    private readonly hasher: Hasher<InvoiceToRpsConverter.Input, string>
  ) { }

  async convert (data: InvoiceToRpsConverter.Input): Promise<InvoiceToRpsConverter.Output> {
    return {
      'ns1:ReqEnvioLoteRPS': {
        '@xmlns:ns1': env.nfse.ns1,
        '@xmlns:tipos': env.nfse.tipos,
        '@xmlns:xsi': env.nfse.xsi,
        '@xsi:schemaLocation': env.nfse.schemaLocation('ReqEnvioLoteRPS'),
        Cabecalho: {
          CodCidade: data.provider.address.cityId,
          CPFCNPJRemetente: data.provider.taxId,
          RazaoSocialRemetente: data.provider.name,
          transacao: '',
          dtInicio: this.timeManipulator.toDate(data.invoiceDate),
          dtFim: this.timeManipulator.toDate(data.invoiceDate),
          QtdRPS: data.items.length,
          ValorTotalServicos: data.invoiceValue,
          ValorTotalDeducoes: 0,
          Versao: 1,
          MetodoEnvio: 'WS'
        },
        Lote: {
          '@Id': `lote:${data.rpsNumber}`,
          RPS: [
            {
              '@Id': `rps:${data.rpsNumber}`,
              Assinatura: await this.hasher.hash(data),
              InscricaoMunicipalPrestador: data.provider.registryId,
              RazaoSocialPrestador: data.provider.name,
              TipoRPS: 'RPS',
              SerieRPS: data.rpsSerie,
              NumeroRPS: data.rpsNumber,
              DataEmissaoRPS: this.timeManipulator.toDateAndTime(data.invoiceDate),
              SituacaoRPS: 'N',
              SeriePrestacao: data.provideSerie,
              InscricaoMunicipalTomador: data.taker.registryId || '0000000',
              CPFCNPJTomador: data.taker.taxId,
              RazaoSocialTomador: data.taker.name,
              DocTomadorEstrangeiro: null,
              TipoLogradouroTomador: '',
              LogradouroTomador: data.taker.address.address,
              NumeroEnderecoTomador: data.taker.address.number,
              ComplementoEnderecoTomador: data.taker.address.complement,
              TipoBairroTomador: 'Bairro',
              BairroTomador: data.taker.address.district,
              CidadeTomador: data.taker.address.cityId,
              CidadeTomadorDescricao: data.taker.address.city,
              CEPTomador: data.taker.address.zip,
              EmailTomador: data.taker.email,
              CodigoAtividade: data.cnae,
              AliquotaAtividade: data.issAliquot,
              TipoRecolhimento: data.pickupType,
              MunicipioPrestacao: data.provider.address.cityId,
              MunicipioPrestacaoDescricao: data.provider.address.city,
              Operacao: data.operation,
              Tributacao: data.taxation,
              ValorPIS: 0.0,
              ValorCOFINS: 0.0,
              ValorINSS: 0.0,
              ValorIR: 0.0,
              ValorCSLL: 0.0,
              AliquotaPIS: 0.0,
              AliquotaCOFINS: 0.0,
              AliquotaINSS: 0.0,
              AliquotaIR: 0.0,
              AliquotaCSLL: 0.0,
              DescricaoRPS: data.description,
              DDDPrestador: this.phoneManipulator.getArea(data.provider.phone),
              TelefonePrestador: this.phoneManipulator.getNumber(data.provider.phone),
              DDDTomador: this.phoneManipulator.getArea(data.taker.phone),
              TelefoneTomador: this.phoneManipulator.getNumber(data.taker.phone),
              MotCancelamento: null,
              CpfCnpjIntermediario: null,
              Deducoes: null,
              Itens: {
                Item: [{
                  DiscriminacaoServico: data.items[0].description,
                  Quantidade: 1,
                  ValorUnitario: data.items[0].unitValue,
                  ValorTotal: data.items[0].totalValue,
                  Tributavel: data.items[0].taxable ? 'S' : 'N'
                }]
              }
            }
          ]
        }
      }
    }
  }
}

export namespace InvoiceToRpsConverter {
  export type Input = Omit<InvoiceModel, 'id'>
  export type Output = RpsLoteModel
}

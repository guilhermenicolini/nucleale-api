import { CabecalhoModel, RpsDeducaoModel, RpsItemModel, RpsLoteModel } from '@/domain/models'
import { RpsModel } from '@/domain/models/nfse'
import env from '@/main/config/env'

export const mockCabecalho = (): CabecalhoModel => ({
  CodCidade: 123,
  CPFCNPJRemetente: '12345678901234',
  RazaoSocialRemetente: 'Company',
  transacao: '',
  dtInicio: '2020-05-10',
  dtFim: '2020-05-10',
  QtdRPS: 1,
  ValorTotalServicos: 100.00,
  ValorTotalDeducoes: 50.00,
  Versao: 1,
  MetodoEnvio: 'WS'
})

export const mockRpsDeducao = (): RpsDeducaoModel => ({
  DeducaoPor: 'any',
  TipoDeducao: 'any words',
  CPFCNPJReferencia: '12345678901',
  NumeroNFReferencia: 123,
  ValorTotalReferencia: 10,
  PercentualDeduzir: 20,
  ValorDeduzir: 50
})

export const mockRpsItem = (): RpsItemModel => ({
  DiscriminacaoServico: 'any words',
  Quantidade: 2,
  ValorUnitario: 10,
  ValorTotal: 20,
  Tributavel: 'S'
})

export const mockRps = (): RpsModel => ({
  '@Id': 'rps:1',
  Assinatura: 'abcd1234',
  InscricaoMunicipalPrestador: '12345678',
  RazaoSocialPrestador: 'Company',
  TipoRPS: 'R',
  SerieRPS: 'NF',
  NumeroRPS: 1,
  DataEmissaoRPS: '2020-05-10T10:00:00',
  SituacaoRPS: 'N',
  SeriePrestacao: 99,
  InscricaoMunicipalTomador: '12345678',
  CPFCNPJTomador: '12345678901',
  RazaoSocialTomador: 'any_name',
  DocTomadorEstrangeiro: '12345678',
  TipoLogradouroTomador: '',
  LogradouroTomador: 'any_address',
  NumeroEnderecoTomador: '123',
  ComplementoEnderecoTomador: 'any_district',
  TipoBairroTomador: 'Bairro',
  BairroTomador: 'any_district',
  CidadeTomador: 123,
  CidadeTomadorDescricao: 'any_city',
  CEPTomador: '12345678',
  EmailTomador: 'mail@inbox.me',
  CodigoAtividade: '12345678',
  AliquotaAtividade: 2.00,
  TipoRecolhimento: 'R',
  MunicipioPrestacao: 123,
  MunicipioPrestacaoDescricao: 'any_city',
  Operacao: 'A',
  Tributacao: 'H',
  ValorPIS: 10,
  ValorCOFINS: 11,
  ValorINSS: 12,
  ValorIR: 13,
  ValorCSLL: 14,
  AliquotaPIS: 15,
  AliquotaCOFINS: 16,
  AliquotaINSS: 17,
  AliquotaIR: 18,
  AliquotaCSLL: 19,
  DescricaoRPS: 'any words',
  DDDPrestador: '19',
  TelefonePrestador: '123456789',
  DDDTomador: '19',
  TelefoneTomador: '123456789',
  MotCancelamento: 'any words',
  CpfCnpjIntermediario: '12345678901234',
  Deducoes: {
    Deducao: [mockRpsDeducao(), mockRpsDeducao()]
  },
  Itens: {
    Item: [mockRpsItem(), mockRpsItem()]
  }
})

export const mockRpsLoteModel = (): RpsLoteModel => ({
  'ns1:ReqEnvioLoteRPS': {
    '@xmlns:ns1': env.nfse.ns1,
    '@xmlns:tipos': env.nfse.tipos,
    '@xmlns:xsi': env.nfse.xsi,
    '@xsi:schemaLocation': env.nfse.schemaLocation('ReqEnvioLoteRPS'),
    Cabecalho: mockCabecalho(),
    Lote: {
      '@Id': 'lote:1',
      RPS: [
        mockRps()
      ]
    }
  }
})

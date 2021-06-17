export type nfseModel = {
  NOTAS_FISCAIS: {
    NOTA_FISCAL: any[]
  }
}

export type CabecalhoModel = {
  CodCidade: number
  CPFCNPJRemetente: string
  RazaoSocialRemetente: string
  transacao: string
  dtInicio: string
  dtFim: string
  QtdRPS: number
  ValorTotalServicos: number
  ValorTotalDeducoes: number
  Versao: number
  MetodoEnvio: string
}

export type RpsItemModel = {
  DiscriminacaoServico: string
  Quantidade: number
  ValorUnitario: number
  ValorTotal: number
  Tributavel: string
}

export type RpsDeducaoModel = {
  DeducaoPor: string
  TipoDeducao: string
  CPFCNPJReferencia: string
  NumeroNFReferencia: number
  ValorTotalReferencia: number
  PercentualDeduzir: number
  ValorDeduzir: number
}

export type RpsModel = {
  '@Id': string
  Assinatura: string
  InscricaoMunicipalPrestador: string
  RazaoSocialPrestador: string
  TipoRPS: string
  SerieRPS: string
  NumeroRPS: number
  DataEmissaoRPS: string
  SituacaoRPS: string
  SeriePrestacao: number
  InscricaoMunicipalTomador: string
  CPFCNPJTomador: string
  RazaoSocialTomador: string
  DocTomadorEstrangeiro: string
  TipoLogradouroTomador: string
  LogradouroTomador: string
  NumeroEnderecoTomador: string
  ComplementoEnderecoTomador: string
  TipoBairroTomador: string
  BairroTomador: string
  CidadeTomador: number
  CidadeTomadorDescricao: string
  CEPTomador: string
  EmailTomador: string
  CodigoAtividade: string
  AliquotaAtividade: number
  TipoRecolhimento: string
  MunicipioPrestacao: number
  MunicipioPrestacaoDescricao: string
  Operacao: string
  Tributacao: string
  ValorPIS: number
  ValorCOFINS: number
  ValorINSS: number
  ValorIR: number
  ValorCSLL: number
  AliquotaPIS: number
  AliquotaCOFINS: number
  AliquotaINSS: number
  AliquotaIR: number
  AliquotaCSLL: number
  DescricaoRPS: string
  DDDPrestador: string
  TelefonePrestador: string
  DDDTomador: string
  TelefoneTomador: string
  MotCancelamento: string
  CpfCnpjIntermediario: string,
  Itens: {
    Item: RpsItemModel[]
  },
  Deducoes: {
    Deducao: RpsDeducaoModel[]
  }
}

export type RpsLoteModel = {
  'ns1:ReqEnvioLoteRPS': {
    '@xmlns:ns1': string
    '@xmlns:tipos': string
    '@xmlns:xsi': string
    '@xsi:schemaLocation': string
    Cabecalho: CabecalhoModel,
    Lote: {
      '@Id': string,
      RPS: RpsModel[]
    }
  }
}

export type RpsLoteResultModel = {
  'ns1:RetornoEnvioLoteRPS': {
    Erros?: {
      Erro: {
        Codigo: number
        Descricao: string
      }
    }
    ChavesNFSeRPS?: {
      ChaveNFSeRPS: {
        ChaveNFe: {
          NumeroNFe: string
          CodigoVerificacao: string
        }
      }
    }
  }
}

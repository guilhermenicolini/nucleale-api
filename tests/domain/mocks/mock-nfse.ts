import { CabecalhoModel, RpsDeducaoModel, RpsItemModel, RpsLoteModel } from '@/domain/models'
import { RpsModel } from '@/domain/models/nfse'
import env from '@/main/config/env'

import faker from 'faker'

export const mockCabecalho = (): CabecalhoModel => ({
  CodCidade: faker.datatype.number(),
  CPFCNPJRemetente: faker.address.zipCode('##############'),
  RazaoSocialRemetente: faker.company.companyName(),
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
  DeducaoPor: faker.random.word(),
  TipoDeducao: faker.random.words(2),
  CPFCNPJReferencia: faker.address.zipCode('###########'),
  NumeroNFReferencia: faker.datatype.number(),
  ValorTotalReferencia: 10,
  PercentualDeduzir: 20,
  ValorDeduzir: 50
})

export const mockRpsItem = (): RpsItemModel => ({
  DiscriminacaoServico: faker.random.words(10),
  Quantidade: 2,
  ValorUnitario: 10,
  ValorTotal: 20,
  Tributavel: 'S'
})

export const mockRps = (): RpsModel => ({
  '@Id': 'rps:1',
  Assinatura: faker.random.alphaNumeric(20),
  InscricaoMunicipalPrestador: faker.address.zipCode('########'),
  RazaoSocialPrestador: faker.company.companyName(),
  TipoRPS: 'R',
  SerieRPS: 'NF',
  NumeroRPS: 1,
  DataEmissaoRPS: '2020-05-10T10:00:00',
  SituacaoRPS: 'N',
  SeriePrestacao: 99,
  InscricaoMunicipalTomador: faker.address.zipCode('########'),
  CPFCNPJTomador: faker.address.zipCode('###########'),
  RazaoSocialTomador: faker.name.findName(),
  DocTomadorEstrangeiro: faker.address.zipCode('########'),
  TipoLogradouroTomador: '',
  LogradouroTomador: faker.address.streetName(),
  NumeroEnderecoTomador: faker.datatype.number().toString(),
  ComplementoEnderecoTomador: faker.address.secondaryAddress(),
  TipoBairroTomador: 'Bairro',
  BairroTomador: faker.address.secondaryAddress(),
  CidadeTomador: faker.datatype.number(),
  CidadeTomadorDescricao: faker.address.city(),
  CEPTomador: faker.address.zipCode('########'),
  EmailTomador: faker.internet.email(),
  CodigoAtividade: faker.address.zipCode('########'),
  AliquotaAtividade: 2.00,
  TipoRecolhimento: 'R',
  MunicipioPrestacao: faker.datatype.number(),
  MunicipioPrestacaoDescricao: faker.address.city(),
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
  DescricaoRPS: faker.random.words(4),
  DDDPrestador: faker.address.zipCode('##'),
  TelefonePrestador: faker.address.zipCode('#########'),
  DDDTomador: faker.address.zipCode('##'),
  TelefoneTomador: faker.address.zipCode('#########'),
  MotCancelamento: faker.random.words(5),
  CpfCnpjIntermediario: faker.address.zipCode('##############'),
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

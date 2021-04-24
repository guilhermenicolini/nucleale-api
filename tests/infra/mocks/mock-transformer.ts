import faker from 'faker'
import moment from 'moment-timezone'

const fakeNumber = (): string => faker.datatype.number({ min: 100, max: 199, precision: 0.01 }).toString().replace('.', ',')

export const mockNfseItem = (): any => ({
  NUM_NOTA: fakeNumber(),
  DATA_HORA_EMISSAO: moment(faker.date.past()).format('DD/MM/YYYY HH:mm:ss'),
  DIA_EMISSAO: faker.datatype.number({ min: 1, max: 20 }).toString().padStart(2, '0'),
  CODIGO_VERIFICACAO: faker.random.alphaNumeric(10),
  DESCRICAO_NOTA: faker.random.words(5),
  VALOR_NOTA: fakeNumber(),
  VALOR_SERVICO: fakeNumber(),
  VALOR_ISS: fakeNumber(),
  ALIQUOTA: fakeNumber(),
  MES_COMPETENCIA: moment(faker.date.past()).format('MM/YYYY'),
  TIPO_RECOLHIMENTO: faker.random.word()[0].toUpperCase(),
  TRIBUTACAO_PRESTACAO: faker.random.word()[0].toUpperCase(),
  CODIGO_ATIVIDADE: faker.datatype.number({ min: 800000000, max: 899999999 }).toString(),
  DESCRICAO_ATIVIDADE: faker.random.words(8).toUpperCase(),
  DESCRICAO_SERVICO: faker.random.words(4),
  CIDADE_PRESTACAO: faker.address.city().toUpperCase(),
  UF_PRESTACAO: faker.address.stateAbbr().toUpperCase()
})

import faker from 'faker'
import moment from 'moment-timezone'

const fakePrice = (): string => faker.datatype.number({ min: 100, max: 199, precision: 0.01 }).toString().replace('.', ',')
const fakeNumber = (length: number): string => faker.address.zipCode(''.padStart(length, '#')).toString()

export const mockNfseItem = (): any => ({
  NUM_NOTA: fakePrice(),
  DATA_HORA_EMISSAO: moment(faker.date.past()).format('DD/MM/YYYY HH:mm:ss'),
  DIA_EMISSAO: faker.datatype.number({ min: 1, max: 20 }).toString().padStart(2, '0'),
  CODIGO_VERIFICACAO: faker.random.alphaNumeric(10),
  DESCRICAO_NOTA: faker.random.words(5),
  VALOR_NOTA: fakePrice(),
  VALOR_SERVICO: fakePrice(),
  VALOR_ISS: fakePrice(),
  ALIQUOTA: fakePrice(),
  MES_COMPETENCIA: moment(faker.date.past()).format('MM/YYYY'),
  TIPO_RECOLHIMENTO: faker.random.word()[0].toUpperCase(),
  TRIBUTACAO_PRESTACAO: faker.random.word()[0].toUpperCase(),
  CODIGO_ATIVIDADE: faker.datatype.number({ min: 800000000, max: 899999999 }).toString(),
  DESCRICAO_ATIVIDADE: faker.random.words(8).toUpperCase(),
  DESCRICAO_SERVICO: faker.random.words(4),
  CIDADE_PRESTACAO: faker.address.city().toUpperCase(),
  UF_PRESTACAO: faker.address.stateAbbr().toUpperCase(),
  TOMADOR_CPF_CNPJ: fakeNumber(11),
  TOMADOR_RAZAO_SOCIAL: faker.company.companyName().toUpperCase(),
  TOMADOR_INSCRICAO_MUNICIPAL: fakeNumber(9),
  TOMADOR_LOGRADOURO: `${faker.address.streetSuffix()} ${faker.address.streetName().toUpperCase()}`,
  TOMADOR_NUMERO: fakeNumber(3),
  TOMADOR_COMPLEMENTO: faker.address.secondaryAddress().toUpperCase(),
  TOMADOR_BAIRRO: faker.address.streetName().toUpperCase(),
  TOMADOR_CEP: fakeNumber(8),
  TOMADOR_CIDADE: faker.address.city().toUpperCase(),
  TOMADOR_UF: faker.address.stateAbbr().toUpperCase(),
  TOMADOR_EMAIL: faker.internet.email(),
  TOMADOR_DDD_TELEFONE: fakeNumber(2),
  TOMADOR_TELEFONE: fakeNumber(9)
})

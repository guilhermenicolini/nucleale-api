export const removeTextCharacters = (value: string): string => {
  return value.replace(/&AMP;LT;BR/g, '')
    .replace(/\/&AMP;GT;/g, '')
    .replace('  ', ' ')
}

export const parseMoney = (value: string): number => {
  const v = value.replace(',', '.')
  return parseFloat(v)
}

export const hasValue = (value: any): boolean => {
  if (typeof value === 'object' || value === null || value === undefined) {
    return false
  }

  return value.trim().length > 0
}

export const trimZeros = (value: string): string => {
  return value ? value.trim().replace(/^0+/, '') : ''
}

export const nfseEnvelope = (method: string, data: any): any => {
  const xml = {}
  xml[`ns1:${method}`] = {
    '@xmlns:ns1': 'http://localhost:8080/WsNFe2/lote',
    '@xmlns:tipos': 'http://localhost:8080/WsNFe2/tp',
    '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    '@xsi:schemaLocation': `http://localhost:8080/WsNFe2/lote http://localhost:8080/WsNFe2/xsd/${method}.xsd`,
    ...data
  }
  return xml
}

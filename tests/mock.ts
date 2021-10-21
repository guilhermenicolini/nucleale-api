export const sendMessageStub = jest.fn().mockImplementation(() => null)
export const sendFileFromBase64Stub = jest.fn().mockImplementation(() => null)
jest.mock('@wppconnect-team/wppconnect', jest.fn().mockImplementation(() => {
  return {
    create: jest.fn().mockImplementation(() => ({
      sendText: sendMessageStub,
      sendFileFromBase64: sendFileFromBase64Stub,
      close: jest.fn()
    }))
  }
}))

export const downloadStub = jest.fn().mockImplementation(() => [Buffer.from(JSON.stringify({ ok: 'ok' }), 'utf8')])

jest.mock('@google-cloud/storage', () => ({
  Storage: jest.fn().mockImplementation(() => {
    return {
      bucket: jest.fn().mockImplementation(() => ({
        file: jest.fn().mockImplementation(() => ({
          exists: jest.fn().mockImplementation(() => [true]),
          save: jest.fn(),
          delete: jest.fn(),
          download: downloadStub
        })),
        getFiles: jest.fn().mockImplementation(() => [[{ name: 'token1' }, { name: 'token2' }]])
      }))
    }
  })
}))

jest.mock('soap', () => ({
  createClient: (url: string, cb: any) => cb(null, {
    testeEnviar: jest.fn().mockImplementation((message, cb) => cb(null, {
      testeEnviarReturn: {
        $value: '<?xml version="1.0" encoding="ISO-8859-1"?><ns1:RetornoEnvioLoteRPS><ChavesNFSeRPS><ChaveNFSeRPS><ChaveNFe><NumeroNFe>999</NumeroNFe><CodigoVerificacao>29j9pa3n</CodigoVerificacao></ChaveNFe></ChaveNFSeRPS></ChavesNFSeRPS></ns1:RetornoEnvioLoteRPS>'
      }
    })),
    url
  })
}))

jest.mock('nodemailer', () => ({
  createTransport: jest.fn()
}))

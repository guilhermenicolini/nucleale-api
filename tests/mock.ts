export const sendMessageStub = jest.fn().mockImplementation((phone, content) => console.log(phone, content))
export const sendFileFromBase64Stub = jest.fn().mockImplementation((phone, base64, filename) => console.log(phone, filename, base64))
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

export const sendMessageStub = jest.fn().mockImplementation((phone, text) => console.log(phone, text))

jest.mock('@wppconnect-team/wppconnect', jest.fn().mockImplementation(() => {
  return {
    create: jest.fn().mockImplementation(() => ({
      sendText: sendMessageStub,
      close: jest.fn()
    }))
  }
}))

jest.mock('@google-cloud/storage', () => ({
  Storage: jest.fn().mockImplementation(() => {
    return {
      bucket: jest.fn().mockImplementation(() => ({
        file: jest.fn().mockImplementation(() => ({
          exists: jest.fn().mockImplementation(() => [true]),
          save: jest.fn(),
          download: jest.fn().mockImplementation(() => Buffer.from(JSON.stringify({ ok: 'ok' }), 'utf8'))
        }))
      }))
    }
  })
}))

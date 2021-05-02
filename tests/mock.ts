export const sendMessageStub = jest.fn()

jest.mock('@wppconnect-team/wppconnect', jest.fn().mockImplementation(() => {
  return {
    create: jest.fn().mockImplementation(() => ({
      sendText: sendMessageStub,
      close: jest.fn()
    }))
  }
}))

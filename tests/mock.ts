export const sendMessageStub = jest.fn().mockImplementation((phone, text) => console.log(phone, text))

jest.mock('@wppconnect-team/wppconnect', jest.fn().mockImplementation(() => {
  return {
    create: jest.fn().mockImplementation(() => ({
      sendText: sendMessageStub,
      close: jest.fn()
    }))
  }
}))

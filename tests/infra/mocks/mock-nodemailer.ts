const nodemailer = require('nodemailer')

export const mockNodeMailer = (stub: Function = jest.fn()): jest.Mocked<typeof nodemailer> => {
  const mockedNodeMailer = nodemailer as jest.Mocked<typeof nodemailer>

  mockedNodeMailer.createTransport.mockImplementation(() => ({
    sendMail: stub
  }))
  return mockedNodeMailer
}

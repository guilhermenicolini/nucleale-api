import { MessageModel } from '@/domain/models'
import { GmailSender } from '@/infra/notification'
import { mockGoogleApis, mockNodeMailer } from '@/tests/infra/mocks'
import env from '@/main/config/env'
import { google } from 'googleapis'
import nodemailer from 'nodemailer'

jest.mock('googleapis')
jest.mock('nodemailer')

const mockData = (): MessageModel => ({
  subject: 'any words',
  email: 'mail@inbox.me',
  phone: '+5519998765432',
  text: 'any words',
  html: 'any'
})

type SutTypes = {
  sut: GmailSender
  mockedGoogleApis: jest.Mocked<typeof google>
  mockedNodeMailer: jest.Mocked<typeof nodemailer>
}

const makeSut = (token: string = 'any_id'): SutTypes => {
  const sut = new GmailSender()
  const mockedGoogleApis = mockGoogleApis(token)
  const mockedNodeMailer = mockNodeMailer()
  return {
    sut,
    mockedGoogleApis,
    mockedNodeMailer
  }
}

describe('Gmail Sender', () => {
  beforeAll(() => {
    env.gmail = {
      clientId: 'any_client_id',
      clientSecret: 'any_client_secret',
      redirectUri: 'any__redirect_uri',
      refreshToken: 'any_refresh_token',
      user: {
        address: 'any_address',
        name: 'any_name'
      }
    }
  })

  test('Should call OAuth2 with correct values', async () => {
    const { sut, mockedGoogleApis } = makeSut()
    const data = mockData()
    await sut.send(data)
    expect(mockedGoogleApis.auth.OAuth2).toHaveBeenCalledWith({
      clientId: env.gmail.clientId,
      clientSecret: env.gmail.clientSecret,
      redirectUri: env.gmail.redirectUri
    })
  })

  test('Should call setCredentials with correct values', async () => {
    const { sut, mockedGoogleApis } = makeSut()
    const data = mockData()
    const spy = jest.spyOn(new mockedGoogleApis.auth.OAuth2(), 'setCredentials')
    await sut.send(data)
    expect(spy).toHaveBeenCalledWith({ refresh_token: env.gmail.refreshToken })
  })

  test('Should call createTransport with correct values', async () => {
    const token = 'any_id'
    const { sut } = makeSut(token)
    const data = mockData()

    await sut.send(data)
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: env.gmail.user.address,
        clientId: env.gmail.clientId,
        clientSecret: env.gmail.clientSecret,
        refreshToken: env.gmail.refreshToken,
        accessToken: token
      }
    })
  })

  test('Should call sendMail with correct values', async () => {
    const { sut } = makeSut()
    const data = mockData()

    await sut.send(data)
    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith({
      from: env.gmail.user,
      to: data.email,
      subject: data.subject,
      html: data.html
    })
  })

  test('Should call sendMail with attachment', async () => {
    const { sut } = makeSut()
    const data = mockData()
    data.file = {
      name: 'filename',
      base64: 'any_base64',
      mimeType: 'application/pdf'
    }

    await sut.send(data)
    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith({
      from: env.gmail.user,
      to: data.email,
      subject: data.subject,
      html: data.html,
      attachments: [{
        filename: data.file.name,
        contentType: data.file.mimeType,
        content: data.file.base64,
        encoding: 'base64'
      }]
    })
  })

  test('Should return falsy on success', async () => {
    const { sut } = makeSut()
    const data = mockData()
    const result = await sut.send(data)
    expect(result).toBeFalsy()
  })

  test('Should return null if send fails', async () => {
    const { sut, mockedGoogleApis } = makeSut()
    const data = mockData()
    jest.spyOn(new mockedGoogleApis.auth.OAuth2(), 'getAccessToken').mockImplementationOnce(null)
    const result = await sut.send(data)
    expect(result).toBeFalsy()
  })
})

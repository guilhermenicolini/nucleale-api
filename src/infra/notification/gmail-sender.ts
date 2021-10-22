import { Sender } from '@/data/protocols'
import nodemailer, { SendMailOptions } from 'nodemailer'
import { google } from 'googleapis'
import env from '@/main/config/env'

const OAuth2 = google.auth.OAuth2

export class GmailSender implements Sender {
  async send (data: Sender.Model): Promise<void> {
    try {
      const oauth2Client = new OAuth2({
        clientId: env.gmail.clientId,
        clientSecret: env.gmail.clientSecret,
        redirectUri: env.gmail.redirectUri
      })

      oauth2Client.setCredentials({
        refresh_token: env.gmail.refreshToken
      })

      const response = await oauth2Client.getAccessToken()

      const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: env.gmail.user.address,
          clientId: env.gmail.clientId,
          clientSecret: env.gmail.clientSecret,
          refreshToken: env.gmail.refreshToken,
          accessToken: response.token
        }
      })

      const mailOptions: SendMailOptions = {
        from: env.gmail.user,
        to: data.email,
        subject: data.subject,
        html: data.html
      }

      if (data.file) {
        mailOptions.attachments = [{
          filename: data.file.name,
          contentType: data.file.mimeType,
          content: data.file.base64,
          encoding: 'base64'
        }]
      }

      await smtpTransport.sendMail(mailOptions)
    } catch {
      return null
    }
  }
}

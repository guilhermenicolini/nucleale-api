import { create, Whatsapp } from '@wppconnect-team/wppconnect'
import { GoogleTokenStore } from './google-token-store-adapter'
import env from '@/main/config/env'

export class WhatsappHelper {
  private client: Whatsapp = null
  private static _instance: WhatsappHelper

  private constructor () { }

  static get instance (): WhatsappHelper {
    if (!WhatsappHelper._instance) {
      WhatsappHelper._instance = new WhatsappHelper()
    }
    return WhatsappHelper._instance
  }

  async connect (): Promise<void> {
    this.client = await create({
      session: env.whatsappSession,
      autoClose: 0,
      tokenStore: new GoogleTokenStore(),
      browserArgs: ['--no-sandbox']
    })
  }

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  }

  async sendMessage (phone: string, content: string): Promise<void> {
    if (!this.client) {
      await this.connect()
    }
    await this.client.sendText(`${phone}@c.us`, content)
  }

  async sendFile (phone: string, base64: string, filename: string, mimetype: string): Promise<void> {
    if (!this.client) {
      await this.connect()
    }
    await this.client.sendFileFromBase64(`${phone}@c.us`, `data:${mimetype};base64,${base64}`, filename)
  }
}

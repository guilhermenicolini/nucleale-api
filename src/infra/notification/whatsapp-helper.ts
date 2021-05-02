import { create, Whatsapp } from '@wppconnect-team/wppconnect'
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
      autoClose: 0
    })
  }

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  }

  async sendMessage (phone: string, message: string): Promise<void> {
    if (!this.client) {
      await this.connect()
    }
    await this.client.sendText(`${phone}@c.us`, message)
  }
}

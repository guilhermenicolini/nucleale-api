import { Messagefy } from '@/data/protocols'

export class PasswordRecoveryMessage implements Messagefy {
  async create (data: PasswordRecoveryMessage.Model): Promise<Messagefy.Result> {
    return {
      email: data.email,
      phone: data.phone,
      text: `Olá, ${data.name}. Acesse ${data.link} para redefinir sua senha. Este link será válido até às ${data.expiration}`,
      html: null
    }
  }
}

export namespace PasswordRecoveryMessage {
  export type Model = {
    name: string
    email: string
    phone: string
    link: string
    expiration: string
  }
}

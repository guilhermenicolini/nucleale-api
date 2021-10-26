import { Messagefy } from '@/data/protocols'
import { SendCertificate } from '@/domain/usecases'

export class SendCertificateMessage implements Messagefy {
  async create (data: SendCertificateMessage.Model): Promise<Messagefy.Result> {
    return {
      subject: 'Seu certificado está pronto',
      email: data.email,
      phone: data.phone,
      text: `Olá, ${data.name}. Seu certificado foi gerado e já estamos te encaminhado.`,
      file: {
        name: data.file.name,
        base64: data.file.base64,
        mimeType: data.file.mimeType
      }
    }
  }
}

export namespace SendCertificateMessage {
  export type Model = SendCertificate.Model
}

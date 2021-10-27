import { ObjectConverter } from '@/data/protocols'
import { CertificateModel, FileModel } from '@/domain/models'
import { GenerateCertificate } from '@/domain/usecases'

export class IoGenerateCertificate implements GenerateCertificate {
  constructor (
    private readonly converter: ObjectConverter<CertificateModel, Promise<FileModel>>
  ) { }

  async generate (data: GenerateCertificate.Data): Promise<GenerateCertificate.Result> {
    return await this.converter.convert(data)
  }
}

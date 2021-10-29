import { LoadCertificateByHash } from '@/domain/usecases'
import { LoadCertificateByHashRepository } from '@/data/protocols'
import { RecordNotFoundError } from '@/presentation/errors'

export class DbLoadCertificateByHash implements LoadCertificateByHash {
  constructor (
    private readonly loadCertificateByHashRepository: LoadCertificateByHashRepository
  ) { }

  async load (hash: string): Promise<DbLoadCertificateByHash.Result> {
    const certificate = await this.loadCertificateByHashRepository.loadByHash(hash)
    if (!certificate) {
      throw new RecordNotFoundError('Certificado não encontrado')
    }
    return certificate
  }
}

export namespace DbLoadCertificateByHash {
  export type Result = LoadCertificateByHash.Result
}

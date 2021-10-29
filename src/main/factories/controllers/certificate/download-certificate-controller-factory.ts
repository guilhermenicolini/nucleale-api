import {
  makeDownloadCertificateValidation,
  makeDbLoadCertificateByHash,
  makeIoGenerateCertificate
} from '@/main/factories'
import { DownloadCertificateController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeDownloadCertificateController = (): Controller => {
  return new DownloadCertificateController(
    makeDownloadCertificateValidation(),
    makeDbLoadCertificateByHash(),
    makeIoGenerateCertificate()
  )
}

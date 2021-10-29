import { CreateCertificateController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import {
  makeCreateCertificateValidation,
  makeDbLoadAccount,
  makeDbCreateCertificate,
  makeIoGenerateCertificate,
  makeRemoteSendCertificate
} from '@/main/factories'

export const makeCreateCertificateController = (): Controller => {
  return new CreateCertificateController(
    makeCreateCertificateValidation(),
    makeDbLoadAccount(),
    makeDbCreateCertificate(),
    makeIoGenerateCertificate(),
    makeRemoteSendCertificate()
  )
}

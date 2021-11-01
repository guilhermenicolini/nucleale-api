import {
  makeDbLoadCertificateByHash
} from '@/main/factories'
import { ValidateCertificateController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeValidateCertificateController = (): Controller => {
  return new ValidateCertificateController(makeDbLoadCertificateByHash())
}

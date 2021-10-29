import {
  makeDbLoadCertificates
} from '@/main/factories'
import { LoadCertificatesController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadCertificatesController = (): Controller => {
  return new LoadCertificatesController(makeDbLoadCertificates())
}

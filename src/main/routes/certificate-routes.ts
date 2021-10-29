import { adaptRoute } from '@/main/adapters'
import {
  makeCreateCertificateController,
  makeDownloadCertificateController
} from '@/main/factories'
import { adminAuth, auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/certificates', adminAuth, adaptRoute(makeCreateCertificateController()))
  router.get('/me/certificates/:hash/download', auth, adaptRoute(makeDownloadCertificateController()))
}

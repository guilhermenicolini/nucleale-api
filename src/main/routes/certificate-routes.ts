import { adaptRoute } from '@/main/adapters'
import {
  makeCreateCertificateeController
} from '@/main/factories'
import { adminAuth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/certificates', adminAuth, adaptRoute(makeCreateCertificateeController()))
}

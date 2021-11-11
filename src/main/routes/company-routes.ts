import { adaptRoute } from '@/main/adapters'
import {
  makeLoadProceduresController
} from '@/main/factories'
import { adminAuth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/company/procedures', adminAuth, adaptRoute(makeLoadProceduresController()))
}

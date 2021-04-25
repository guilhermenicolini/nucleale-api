import { adaptRoute } from '@/main/adapters'
import {
  makeUploadInvoicesController
} from '@/main/factories'
import { adminAuth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/invoices/upload', adminAuth, adaptRoute(makeUploadInvoicesController()))
}

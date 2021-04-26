import { adaptRoute } from '@/main/adapters'
import {
  makeUploadInvoicesController,
  makeLoadInvoicesController
} from '@/main/factories'
import { adminAuth, auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/invoices/upload', adminAuth, adaptRoute(makeUploadInvoicesController()))
  router.get('/invoices', auth, adaptRoute(makeLoadInvoicesController()))
}

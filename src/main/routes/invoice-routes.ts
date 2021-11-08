import { adaptRoute } from '@/main/adapters'
import {
  makeUploadInvoicesController,
  makeLoadInvoicesController,
  makeDownloadInvoiceController,
  makeCreateInvoiceController,
  makeResendInvoiceController
} from '@/main/factories'
import { adminAuth, auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/invoices/upload', adminAuth, adaptRoute(makeUploadInvoicesController()))
  router.get('/me/invoices', auth, adaptRoute(makeLoadInvoicesController()))
  router.get('/me/invoices/:iId/download', auth, adaptRoute(makeDownloadInvoiceController()))
  router.post('/invoices', adminAuth, adaptRoute(makeCreateInvoiceController()))
  router.post('/invoices/:iId/resend', adminAuth, adaptRoute(makeResendInvoiceController()))
}

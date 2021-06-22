import { adaptRoute } from '@/main/adapters'
import {
  makeLoadAccountsByStatusController,
  makeApproveAccountController,
  makeInviteAccountController,
  makeLoadAccountController,
  makeLoadAccountsController
} from '@/main/factories'
import { adminAuth, auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/accounts/status/:status', adminAuth, adaptRoute(makeLoadAccountsByStatusController()))
  router.post('/accounts/:id/approve', adminAuth, adaptRoute(makeApproveAccountController()))
  router.post('/accounts/invite/:email', auth, adaptRoute(makeInviteAccountController()))
  router.get('/accounts/me', auth, adaptRoute(makeLoadAccountController()))
  router.get('/accounts', auth, adaptRoute(makeLoadAccountsController()))
}

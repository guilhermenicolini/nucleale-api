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
  router.post('/me/invite/:email', auth, adaptRoute(makeInviteAccountController()))
  router.get('/me/profile', auth, adaptRoute(makeLoadAccountController()))
  router.get('/me/accounts', auth, adaptRoute(makeLoadAccountsController()))
}

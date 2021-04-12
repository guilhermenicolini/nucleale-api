import { adaptRoute } from '@/main/adapters'
import {
  makeSignUpController,
  makeLoginController,
  makeLoadAccountsByStatusController,
  makeApproveAccountController,
  makeInviteAccountController
} from '@/main/factories'
import { adminAuth, auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))

  router.get('/accounts/status/:status', adminAuth, adaptRoute(makeLoadAccountsByStatusController()))
  router.post('/accounts/:id/approve', adminAuth, adaptRoute(makeApproveAccountController()))
  router.post('/accounts/invite/:email', auth, adaptRoute(makeInviteAccountController()))
}

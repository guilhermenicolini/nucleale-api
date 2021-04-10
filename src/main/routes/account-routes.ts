import { adaptRoute } from '@/main/adapters'
import {
  makeSignUpController,
  makeLoginController,
  makeLoadAccountsByStatusController,
  makeApproveAccountController
} from '@/main/factories'
import { adminAuth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))

  router.get('/accounts/status/:status', adminAuth, adaptRoute(makeLoadAccountsByStatusController()))
  router.get('/accounts/:id/approve', adminAuth, adaptRoute(makeApproveAccountController()))
}

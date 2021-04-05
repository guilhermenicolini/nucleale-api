import { adaptRoute } from '@/main/adapters'
import {
  makeSignUpController,
  makeLoginController,
  makeLoadAccountsByStatusController
} from '@/main/factories'
import { adminAuth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))

  router.get('/accounts/status/:status', adminAuth, adaptRoute(makeLoadAccountsByStatusController()))
}

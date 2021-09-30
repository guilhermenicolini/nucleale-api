import { adaptRoute } from '@/main/adapters'
import {
  makeSignUpController,
  makeLoginController,
  makePasswordRecoveryController,
  makeCheckPasswordRequestController
} from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
  router.post('/password-recovery/:email', adaptRoute(makePasswordRecoveryController()))
  router.get('/change-password/:token', adaptRoute(makeCheckPasswordRequestController()))
}

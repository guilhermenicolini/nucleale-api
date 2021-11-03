import { adaptRoute } from '@/main/adapters'
import {
  makeLoadAddressByZipController
} from '@/main/factories'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/locations/:zip', auth, adaptRoute(makeLoadAddressByZipController()))
}

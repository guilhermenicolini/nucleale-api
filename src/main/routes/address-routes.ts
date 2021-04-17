import { adaptRoute } from '@/main/adapters'
import {
  makeSaveAddressController,
  makeLoadAddressController
} from '@/main/factories'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/address', auth, adaptRoute(makeLoadAddressController()))
  router.put('/address', auth, adaptRoute(makeSaveAddressController()))
}

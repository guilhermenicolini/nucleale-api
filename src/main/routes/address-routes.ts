import { adaptRoute } from '@/main/adapters'
import {
  makeSaveAddressController
} from '@/main/factories'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.put('/address', auth, adaptRoute(makeSaveAddressController()))
}

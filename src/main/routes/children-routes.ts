import { adaptRoute } from '@/main/adapters'
import {
  makeAddChildrenController,
  makeLoadChildrensController
} from '@/main/factories'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/childrens', auth, adaptRoute(makeAddChildrenController()))
  router.get('/childrens', auth, adaptRoute(makeLoadChildrensController()))
}
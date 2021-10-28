import { adaptRoute } from '@/main/adapters'
import {
  makeAddChildrenController,
  makeLoadChildrensController,
  makeUpdateChildrenController,
  makeDeleteChildrenController
} from '@/main/factories'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/me/childrens', auth, adaptRoute(makeAddChildrenController()))
  router.get('/me/childrens', auth, adaptRoute(makeLoadChildrensController()))
  router.put('/me/childrens/:id', auth, adaptRoute(makeUpdateChildrenController()))
  router.delete('/me/childrens/:id', auth, adaptRoute(makeDeleteChildrenController()))
}

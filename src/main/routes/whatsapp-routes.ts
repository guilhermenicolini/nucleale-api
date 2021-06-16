import { adaptRoute } from '@/main/adapters'
import {
  makeSendWhatsappMessageController
} from '@/main/factories'
import { adminAuth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/whatsapp/message', adminAuth, adaptRoute(makeSendWhatsappMessageController()))
}

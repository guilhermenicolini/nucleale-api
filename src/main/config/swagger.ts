import swaggerConfig from '@/main/docs'
import { noCache, redirect } from '@/main/middlewares'

import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'

export default (app: Express): void => {
  app.get('/', redirect('/api-docs'))
  app.use('/api-docs', noCache, serve, setup(swaggerConfig))
}

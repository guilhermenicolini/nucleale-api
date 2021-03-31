import { Express, Router } from 'express'
import setupAccountRoutes from '@/main/routes/account-routes'

export default (app: Express): void => {
  const router = Router()
  setupAccountRoutes(router)
  app.use('', router)
}

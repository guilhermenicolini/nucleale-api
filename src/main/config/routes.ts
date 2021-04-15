import { Express, Router } from 'express'
import setupAccountRoutes from '@/main/routes/account-routes'
import setupAddressRoutes from '@/main/routes/address-routes'

export default (app: Express): void => {
  const router = Router()
  setupAccountRoutes(router)
  setupAddressRoutes(router)
  app.use('', router)
}

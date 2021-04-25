import { Express, Router } from 'express'
import setupAccountRoutes from '@/main/routes/account-routes'
import setupAddressRoutes from '@/main/routes/address-routes'
import setupChildrenRoutes from '@/main/routes/children-routes'
import setupInvoiceRoutes from '@/main/routes/invoice-routes'

export default (app: Express): void => {
  const router = Router()
  setupAccountRoutes(router)
  setupAddressRoutes(router)
  setupChildrenRoutes(router)
  setupInvoiceRoutes(router)
  app.use('', router)
}

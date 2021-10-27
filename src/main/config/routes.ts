import { Express, Router } from 'express'
import setupAuthenticationRoutes from '@/main/routes/authentication-routes'
import setupAccountRoutes from '@/main/routes/account-routes'
import setupAddressRoutes from '@/main/routes/address-routes'
import setupChildrenRoutes from '@/main/routes/children-routes'
import setupInvoiceRoutes from '@/main/routes/invoice-routes'
import setupWhatsappRoutes from '@/main/routes/whatsapp-routes'
import setupCertificateRoutes from '@/main/routes/certificate-routes'

export default (app: Express): void => {
  const router = Router()
  setupAuthenticationRoutes(router)
  setupAccountRoutes(router)
  setupAddressRoutes(router)
  setupChildrenRoutes(router)
  setupInvoiceRoutes(router)
  setupWhatsappRoutes(router)
  setupCertificateRoutes(router)
  app.use('', router)
}

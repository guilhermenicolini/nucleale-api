import { Express, Router } from 'express'
import accountRoutes from '@/main/routes/account-routes'

export default (app: Express): void => {
  const router = Router()
  router.use(accountRoutes)
  app.use('/api', router)
}

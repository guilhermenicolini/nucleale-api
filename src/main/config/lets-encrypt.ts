import { Express } from 'express'
import env from '@/main/config/env'

export default (app: Express): void => {
  app.get('/.well-known/acme-challenge/:content?', function (req, res) {
    res.send(env.certbot)
  })
}

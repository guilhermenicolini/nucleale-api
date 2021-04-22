import { bodyParser, contentType, cors, fileParser } from '@/main/middlewares'

import { Express } from 'express'

export default (app: Express): void => {
  app.use(fileParser)
  app.use(bodyParser)
  app.use(contentType)
  app.use(cors)
}

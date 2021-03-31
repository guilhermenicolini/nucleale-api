import setupLetsEncrypt from './lets-encrypt'
import setupSwagger from './swagger'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

import express from 'express'

const app = express()
setupLetsEncrypt(app)
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
export default app

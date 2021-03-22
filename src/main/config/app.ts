import setupSwagger from './swagger'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupRedirect from './redirect'

import express from 'express'
const serverless = require('serverless-http')

const app = express()
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
setupRedirect(app)
export default app
export const handler = serverless(app)

import setupSwagger from './swagger'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

import express from 'express'
const serverless = require('serverless-http')

const app = express()
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
export default app
export const handler = serverless(app)

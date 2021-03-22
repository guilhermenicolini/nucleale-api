const app = require('../dist/main/config/app').default
const serverless = require('serverless-http')

module.exports = app
module.exports.handler = serverless(app)

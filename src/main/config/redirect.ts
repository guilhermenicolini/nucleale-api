import { Express } from 'express'

export default (app: Express): void => {
  app.get('/', (req, res) => {
    res.redirect('/api-docs')
  })
}

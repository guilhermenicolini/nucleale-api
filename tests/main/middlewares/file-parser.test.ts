import app from '@/main/config/app'

import request from 'supertest'

describe('File Parser Middleware', () => {
  test('Should parse file', async () => {
    app.post('/test-file-parser', (req, res) => {
      const file = req.files[0]
      const response = {
        fieldname: file.fieldname,
        mimetype: file.mimetype
      }
      res.send(response)
    })
    await request(app)
      .post('/test-file-parser')
      .attach('xml', 'tests/main/mocks/mock.xml')
      .expect({ fieldname: 'xml', mimetype: 'application/xml' })
  })
})

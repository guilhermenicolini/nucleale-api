export const invoicesPaths = {
  '/invoices/upload': {
    post: {
      tags: ['Invoices'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to upload invoices',
      description: 'This API is closed and can only be executed by **admins**',
      operationId: 'uploadInvoices',
      requestBody: {
        description: 'NFSe xml file to be uploaded',
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                fileName: {
                  type: 'string',
                  format: 'binary'
                }
              }
            }
          }
        }
      },
      responses: {
        204: {
          description: 'No Content'
        },
        400: {
          $ref: '#/components/errors/badRequest'
        },
        401: {
          $ref: '#/components/errors/unauthorized'
        },
        403: {
          $ref: '#/components/errors/forbidden'
        },
        500: {
          $ref: '#/components/errors/serverError'
        }
      }
    }
  },
  '/invoices': {
    get: {
      tags: ['Invoices'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to retrieve invoices',
      description: 'This API is closed and can only be executed by all **authenticated** users',
      operationId: 'loadInvoices',
      responses: {
        200: {
          description: 'Ok',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/invoices'
              }
            }
          }
        },
        401: {
          $ref: '#/components/errors/unauthorized'
        },
        500: {
          $ref: '#/components/errors/serverError'
        }
      }
    }
  }
}

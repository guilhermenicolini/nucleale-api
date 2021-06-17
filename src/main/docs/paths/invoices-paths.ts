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
    post: {
      tags: ['Invoices'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to create invoice',
      description: 'This API is closed and can only be executed by **admins**',
      operationId: 'createInvoice',
      requestBody: {
        description: 'Invoice object to be created',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/schemas/createInvoice'
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
        404: {
          $ref: '#/components/errors/notFound'
        },
        500: {
          $ref: '#/components/errors/serverError'
        }
      }
    },
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
  },
  '/invoices/{invoiceNo}/download': {
    get: {
      tags: ['Invoices'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to download invoice',
      description: 'This API is closed and can only be executed by all **authenticated** users',
      operationId: 'downloadInvoice',
      parameters: [{
        in: 'path',
        name: 'invoiceNo',
        description: 'Invoice number to be downloaded',
        required: true,
        schema: {
          type: 'number',
          format: 'int32'
        }
      }],
      responses: {
        200: {
          description: 'Ok',
          content: {
            'application/pdf': {
              schema: {
                type: 'string',
                format: 'binary'
              }
            }
          }
        },
        400: {
          $ref: '#/components/errors/badRequest'
        },
        401: {
          $ref: '#/components/errors/unauthorized'
        },
        404: {
          $ref: '#/components/errors/notFound'
        },
        500: {
          $ref: '#/components/errors/serverError'
        }
      }
    }
  },
  '/invoices/{invoiceNo}/resend': {
    post: {
      tags: ['Invoices'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to resend invoice',
      description: 'This API is closed and can only be executed by **admins**',
      operationId: 'resendInvoice',
      parameters: [{
        in: 'path',
        name: 'invoiceNo',
        description: 'Invoice number to be resent',
        required: true,
        schema: {
          type: 'number',
          format: 'int32'
        }
      }],
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
        404: {
          $ref: '#/components/errors/notFound'
        },
        500: {
          $ref: '#/components/errors/serverError'
        }
      }
    }
  }
}

export const certificatesPaths = {
  '/certificates': {
    post: {
      tags: ['Certificates'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to create certificate',
      description: 'This API is closed and can only be executed by **admins**',
      operationId: 'createCertificate',
      requestBody: {
        description: 'Certificate object to be created',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/schemas/createCertificate'
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
    }
  },
  '/me/certificates/{hash}/download': {
    get: {
      tags: ['Me'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to download current user certificate',
      description: 'This API is closed and can only be executed by all **authenticated** users',
      operationId: 'downloadCertificate',
      parameters: [{
        in: 'path',
        name: 'hash',
        description: 'Certificate hash to be downloaded',
        required: true,
        schema: {
          type: 'string'
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
  '/me/certificates': {
    get: {
      tags: ['Me'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to retrieve current user certificates',
      description: 'This API is closed and can only be executed by all **authenticated** users',
      operationId: 'loadCertificates',
      responses: {
        200: {
          description: 'Ok',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/certificates'
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

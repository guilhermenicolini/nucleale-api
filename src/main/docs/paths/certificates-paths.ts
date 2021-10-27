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
  }
}

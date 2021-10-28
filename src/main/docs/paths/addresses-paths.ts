export const addressesPaths = {
  '/me/address': {
    put: {
      tags: ['Me'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to update current user address',
      description: 'This API is closed and can only be executed by all **authenticated** users',
      operationId: 'saveAddress',
      requestBody: {
        description: 'Address object to be updated',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/schemas/address'
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
        500: {
          $ref: '#/components/errors/serverError'
        }
      }
    },
    get: {
      tags: ['Me'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to retrieve current user address',
      description: 'This API is closed and can only be executed by all **authenticated** users',
      operationId: 'loadAddress',
      responses: {
        200: {
          description: 'Ok',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/address'
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

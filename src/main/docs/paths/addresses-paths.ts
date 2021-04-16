export const addressesPaths = {
  '/address': {
    put: {
      tags: ['Addresses'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to update address',
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
        403: {
          $ref: '#/components/errors/forbidden'
        },
        500: {
          $ref: '#/components/errors/serverError'
        }
      }
    }
  }
}
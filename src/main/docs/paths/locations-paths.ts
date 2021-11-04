export const locationsPaths = {
  '/locations/{zip}': {
    get: {
      tags: ['Locations'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to load address by zip code',
      description: 'This API is closed and can only be executed by all **authenticated** users',
      operationId: 'loadAddressByZip',
      parameters: [{
        in: 'path',
        name: 'zip',
        description: 'Zip code to be searched',
        required: true,
        schema: {
          type: 'string'
        }
      }],
      responses: {
        200: {
          description: 'Ok',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/zipAddress'
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
        500: {
          $ref: '#/components/errors/serverError'
        }
      }
    }
  }
}

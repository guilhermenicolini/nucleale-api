export const childrensPaths = {
  '/childrens': {
    post: {
      tags: ['Childrens'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to create children',
      description: 'This API is closed and can only be executed by all **authenticated** users',
      operationId: 'addChildren',
      requestBody: {
        description: 'Children object to be created',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/schemas/addChildren'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Created',
          content: {
            'application/json': {
              schema: {
                $ref: '#components/schemas/id'
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
    },
    get: {
      tags: ['Childrens'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to retrieve childrens',
      description: 'This API is closed and can only be executed by all **authenticated** users',
      operationId: 'loadChildrens',
      responses: {
        200: {
          description: 'Ok',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/childrens'
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

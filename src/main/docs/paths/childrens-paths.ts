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
              $ref: '#components/schemas/saveChildren'
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
  },
  '/childrens/{id}': {
    put: {
      tags: ['Childrens'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to update children',
      description: 'This API is closed and can only be executed by all **authenticated** users',
      operationId: 'updateChildren',
      parameters: [{
        in: 'path',
        name: 'id',
        description: 'Children id to be approved',
        required: true,
        schema: {
          type: 'string'
        }
      }],
      requestBody: {
        description: 'Children object to be updated',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/schemas/saveChildren'
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

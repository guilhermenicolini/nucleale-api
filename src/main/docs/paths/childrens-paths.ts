export const childrensPaths = {
  '/me/childrens': {
    post: {
      tags: ['Me'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to create current user children',
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
      tags: ['Me'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to retrieve current user childrens',
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
  '/me/childrens/{id}': {
    put: {
      tags: ['Me'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to update current user children',
      description: 'This API is closed and can only be executed by all **authenticated** users',
      operationId: 'updateChildren',
      parameters: [{
        in: 'path',
        name: 'id',
        description: 'Children id to be updated',
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
    },
    delete: {
      tags: ['Me'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to delete current user children',
      description: 'This API is closed and can only be executed by all **authenticated** users',
      operationId: 'deleteChildren',
      parameters: [{
        in: 'path',
        name: 'id',
        description: 'Children id to be deleted',
        required: true,
        schema: {
          type: 'string'
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

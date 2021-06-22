export const accountsPaths = {
  '/accounts/status/{status}': {
    get: {
      tags: ['Accounts'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to find users by status',
      description: 'This API is closed and can only be executed by **admins**',
      operationId: 'getAccountsByStatus',
      parameters: [{
        in: 'path',
        name: 'status',
        description: 'Account status to be searched',
        required: true,
        schema: {
          type: 'string',
          enum: [
            'awaitingVerification',
            'active'
          ]
        }
      }],
      responses: {
        200: {
          description: 'Ok',
          content: {
            'application/json': {
              schema: {
                $ref: '#components/schemas/accounts'
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
        403: {
          $ref: '#/components/errors/forbidden'
        },
        500: {
          $ref: '#/components/errors/serverError'
        }
      }
    }
  },
  '/accounts/{id}/approve': {
    post: {
      tags: ['Accounts'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to approve an account',
      description: 'This API is closed and can only be executed by **admins**',
      operationId: 'approveAccount',
      parameters: [{
        in: 'path',
        name: 'id',
        description: 'Account id to be approved',
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
  '/accounts/invite/{email}': {
    post: {
      tags: ['Accounts'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to invite an account',
      description: 'This API is closed and can only be executed by all **authenticated** users',
      operationId: 'inviteAccount',
      parameters: [{
        in: 'path',
        name: 'email',
        description: 'Email to be invited',
        required: true,
        schema: {
          type: 'string',
          format: 'email'
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
        500: {
          $ref: '#/components/errors/serverError'
        }
      }
    }
  },
  '/accounts/me': {
    get: {
      tags: ['Accounts'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to retrieve current user account',
      description: 'This API is closed and can only be executed by all **authenticated** users',
      operationId: 'getAccount',
      responses: {
        200: {
          description: 'Ok',
          content: {
            'application/json': {
              schema: {
                $ref: '#components/schemas/account'
              }
            }
          }
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

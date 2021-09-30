export const authenticationPaths = {
  '/signup': {
    post: {
      tags: ['Authentication'],
      summary: 'API to create an user account',
      description: 'This API is open and can be executed by **anyone**',
      operationId: 'signUp',
      requestBody: {
        description: 'User object to be created',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/schemas/signUp'
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
                $ref: '#components/schemas/token'
              }
            }
          }
        },
        400: {
          $ref: '#/components/errors/badRequest'
        },
        409: {
          $ref: '#/components/errors/conflict'
        },
        500: {
          $ref: '#/components/errors/serverError'
        }
      }
    }
  },
  '/login': {
    post: {
      tags: ['Authentication'],
      summary: 'API to authenticate an user',
      description: 'This API is open and can be executed by **anyone**',
      operationId: 'login',
      requestBody: {
        description: 'User object to be authenticated',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/schemas/login'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Ok',
          content: {
            'application/json': {
              schema: {
                $ref: '#components/schemas/token'
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
  },
  '/password-recovery/{email}': {
    post: {
      tags: ['Authentication'],
      summary: 'API to recover password',
      description: 'This API is open and can be executed by **anyone**',
      operationId: 'passwordRecovery',
      parameters: [{
        in: 'path',
        name: 'email',
        description: 'Account email',
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
        404: {
          $ref: '#/components/errors/notFound'
        },
        500: {
          $ref: '#/components/errors/serverError'
        }
      }
    }
  },
  '/change-password/{token}': {
    get: {
      tags: ['Authentication'],
      summary: 'API to check change password request',
      description: 'This API is open and can be executed by **anyone**',
      operationId: 'changePasswordRequest',
      parameters: [{
        in: 'path',
        name: 'token',
        description: 'Change password token',
        required: true,
        schema: {
          type: 'string'
        }
      }],
      responses: {
        200: {
          description: 'Ok'
        },
        400: {
          $ref: '#/components/errors/badRequest'
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

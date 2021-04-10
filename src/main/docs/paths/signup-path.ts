export const signUpPath = {
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
}

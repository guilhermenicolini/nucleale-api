export const loginPath = {
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
}

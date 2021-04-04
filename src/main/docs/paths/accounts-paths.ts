export const accountsPaths = {
  '/accounts/status/{status}': {
    get: {
      tags: ['Accounts'],
      summary: 'API to find users by status',
      description: 'This API is closed and can be executed to **admins**',
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
        500: {
          $ref: '#/components/errors/serverError'
        }
      }
    }
  }
}

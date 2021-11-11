export const companiesPaths = {
  '/company/procedures': {
    get: {
      tags: ['Companies'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to retrieve company procedures',
      description: 'This API is closed and can only be executed by **admins**',
      operationId: 'loadProcedures',
      responses: {
        200: {
          description: 'Ok',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/procedures'
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

export const whatsappPaths = {
  '/whatsapp/message': {
    post: {
      tags: ['Whatsapp'],
      security: [{
        bearerAuth: []
      }],
      summary: 'API to send whatsapp message',
      description: 'This API is closed and can only be executed by **admins**',
      operationId: 'sendWhatsappMessage',
      requestBody: {
        description: 'Message object to be sent',
        content: {
          'application/json': {
            schema: {
              $ref: '#components/schemas/whatsappMessage'
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

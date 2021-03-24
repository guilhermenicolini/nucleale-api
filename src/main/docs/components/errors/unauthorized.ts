export const unauthorizedError = {
  description: 'Unauthorized',
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/error'
      }
    }
  }
}

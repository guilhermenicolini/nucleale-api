export const forbiddenError = {
  description: 'Forbidden',
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/error'
      }
    }
  }
}

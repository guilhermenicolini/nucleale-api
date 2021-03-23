export const badRequestError = {
  description: 'Bad Request',
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/error'
      }
    }
  }
}

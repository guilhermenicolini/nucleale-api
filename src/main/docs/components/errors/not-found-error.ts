export const notFoundError = {
  description: 'Not Found',
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/error'
      }
    }
  }
}

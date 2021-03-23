export const conflictError = {
  description: 'Conflict',
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/error'
      }
    }
  }
}

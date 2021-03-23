export const errorSchema = {
  type: 'object',
  properties: {
    error: {
      type: 'string'
    }
  },
  example: {
    error: 'Error message example'
  },
  required: ['error']
}

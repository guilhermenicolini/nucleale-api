export const procedureSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    service: {
      $ref: '#components/schemas/service'
    }
  },
  required: ['id', 'name', 'description']
}

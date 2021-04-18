export const childrenSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    accountId: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    birth: {
      type: 'number',
      format: 'milliseconds'
    },
    gender: {
      type: 'string',
      enum: [
        'male',
        'female'
      ]
    }
  },
  required: ['id', 'accountId', 'name', 'birth', 'gender']
}

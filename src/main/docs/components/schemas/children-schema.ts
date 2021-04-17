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
      type: 'string'
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

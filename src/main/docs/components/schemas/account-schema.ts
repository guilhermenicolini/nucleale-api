export const accountSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    accountId: {
      type: 'string'
    },
    taxId: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    mobilePhone: {
      type: 'string'
    },
    birth: {
      type: 'number',
      format: 'milliseconds'
    },
    status: {
      type: 'string',
      enum: [
        'awaitingVerification',
        'active'
      ]
    },
    role: {
      type: 'string'
    }
  },
  required: ['id', 'accountId', 'taxId', 'name', 'email', 'mobilePhone', 'birth', 'status', 'role']
}

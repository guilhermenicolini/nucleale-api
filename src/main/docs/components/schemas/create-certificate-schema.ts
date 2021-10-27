export const createCertificateSchema = {
  type: 'object',
  properties: {
    user: {
      type: 'string'
    },
    procedure: {
      type: 'string'
    },
    type: {
      type: 'string',
      enum: [
        'online',
        'classroom'
      ]
    },
    date: {
      type: 'number',
      format: 'milliseconds'
    }
  },
  required: ['user', 'procedure', 'type', 'date']
}

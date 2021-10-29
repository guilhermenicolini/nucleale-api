export const certificateSchema = {
  type: 'object',
  properties: {
    hash: {
      type: 'string'
    },
    type: {
      type: 'string',
      enum: [
        'online',
        'classroom'
      ]
    },
    course: {
      type: 'string'
    },
    date: {
      type: 'number',
      format: 'milliseconds'
    },
    name: {
      type: 'string'
    },
    hours: {
      type: 'number',
      format: 'double'
    }
  },
  required: ['hash', 'type', 'course', 'date', 'name', 'hours']
}

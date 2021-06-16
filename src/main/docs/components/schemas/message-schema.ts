export const messageSchema = {
  type: 'object',
  properties: {
    mobilePhone: {
      type: 'string'
    },
    message: {
      type: 'string'
    }
  },
  required: ['mobilePhone', 'message']
}

export const loginSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  example: {
    email: 'john.doe@inbox.com',
    password: 'ZD7!_Mmd'
  },
  required: ['email', 'password']
}

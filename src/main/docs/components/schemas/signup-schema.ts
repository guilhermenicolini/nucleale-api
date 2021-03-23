export const signupSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    passwordConfirmation: {
      type: 'string'
    }
  },
  example: {
    email: 'john.doe@inbox.com',
    password: 'ZD7!_Mmd',
    passwordConfirmation: 'ZD7!_Mmd'
  },
  required: ['email', 'password', 'passwordConfirmation']
}

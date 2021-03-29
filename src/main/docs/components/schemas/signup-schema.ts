export const signupSchema = {
  type: 'object',
  properties: {
    taxId: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    passwordConfirmation: {
      type: 'string'
    },
    mobilePhone: {
      type: 'string'
    },
    birth: {
      type: 'number',
      format: 'int32'
    }
  },
  required: ['taxId', 'name', 'email', 'password', 'passwordConfirmation', 'mobilePhone', 'birth']
}

import { signUpPath, loginPath, accountsPaths, addressesPaths } from './paths'
import {
  signupSchema,
  tokenSchema,
  errorSchema,
  badRequestError,
  conflictError,
  serverError,
  loginSchema,
  unauthorizedError,
  accountSchema,
  accountsSchema,
  bearerSchema,
  forbiddenError,
  notFoundError,
  addressSchema
} from './components'

import map from './utils/mapper'

export const paths = {
  '/signup': signUpPath,
  '/login': loginPath,
  ...accountsPaths,
  ...addressesPaths
}

export const components = {
  schemas: {
    signUp: signupSchema,
    token: tokenSchema,
    error: errorSchema,
    login: loginSchema,
    account: accountSchema,
    accounts: accountsSchema,
    address: map(addressSchema, ['id', 'accountId'])
  },
  errors: {
    badRequest: badRequestError,
    conflict: conflictError,
    serverError: serverError,
    unauthorized: unauthorizedError,
    forbidden: forbiddenError,
    notFound: notFoundError
  },
  securitySchemes: bearerSchema
}

import {
  signUpPath,
  loginPath,
  accountsPaths,
  addressesPaths,
  childrensPaths
} from './paths'
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
  addressSchema,
  childrenSchema,
  idSchema,
  childrensSchema
} from './components'

import map from './utils/mapper'

export const paths = {
  '/signup': signUpPath,
  '/login': loginPath,
  ...accountsPaths,
  ...addressesPaths,
  ...childrensPaths
}

export const components = {
  schemas: {
    signUp: signupSchema,
    token: tokenSchema,
    error: errorSchema,
    login: loginSchema,
    account: accountSchema,
    accounts: accountsSchema,
    address: map(addressSchema, ['id', 'accountId']),
    addChildren: map(childrenSchema, ['id', 'accountId']),
    children: map(childrenSchema, ['accountId']),
    childrens: childrensSchema,
    id: idSchema
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

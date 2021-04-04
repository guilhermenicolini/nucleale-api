import { signUpPath, loginPath, accountsPaths } from './paths'
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
  accountsSchema
} from './components'

export const paths = {
  '/signup': signUpPath,
  '/login': loginPath,
  ...accountsPaths
}

export const components = {
  schemas: {
    signUp: signupSchema,
    token: tokenSchema,
    error: errorSchema,
    login: loginSchema,
    account: accountSchema,
    accounts: accountsSchema
  },
  errors: {
    badRequest: badRequestError,
    conflict: conflictError,
    serverError: serverError,
    unauthorized: unauthorizedError
  }
}

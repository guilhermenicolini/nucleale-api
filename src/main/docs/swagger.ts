import {
  authenticationPaths,
  accountsPaths,
  addressesPaths,
  childrensPaths,
  invoicesPaths,
  whatsappPaths
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
  childrensSchema,
  invoiceSchema,
  invoicesSchema,
  createInvoiceSchema,
  messageSchema
} from './components'

import map from './utils/mapper'

export const tags = {
  tags: [
    {
      name: 'Authentication',
      description: 'Authentication related APIs'
    },
    {
      name: 'Accounts',
      description: 'Accounts related APIs'
    },
    {
      name: 'Address',
      description: 'Address related APIs'
    },
    {
      name: 'Childrens',
      description: 'Childrens related APIs'
    },
    {
      name: 'Invoices',
      description: 'Invoices related APIs'
    },
    {
      name: 'Whatsapp',
      description: 'Whatsapp related APIs'
    }
  ]
}

export const paths = {
  ...authenticationPaths,
  ...accountsPaths,
  ...addressesPaths,
  ...childrensPaths,
  ...invoicesPaths,
  ...whatsappPaths
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
    saveChildren: map(childrenSchema, ['id', 'accountId']),
    children: map(childrenSchema, ['accountId']),
    childrens: childrensSchema,
    id: idSchema,
    invoice: invoiceSchema,
    invoices: invoicesSchema,
    createInvoice: createInvoiceSchema,
    whatsappMessage: messageSchema
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

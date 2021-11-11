import {
  authenticationPaths,
  accountsPaths,
  addressesPaths,
  childrensPaths,
  invoicesPaths,
  whatsappPaths,
  certificatesPaths,
  locationsPaths,
  companiesPaths
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
  messageSchema,
  changePasswordSchema,
  createCertificateSchema,
  certificateSchema,
  certificatesSchema,
  searchAccountsSchema,
  proceduresSchema,
  procedureSchema,
  serviceSchema

} from './components'

import map from './utils/mapper'

export const tags = {
  tags: [
    {
      name: 'Authentication',
      description: 'Authentication related APIs'
    },
    {
      name: 'Me',
      description: 'Authenticated user related APIs'
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
      name: 'Locations',
      description: 'Locations related APIs'
    },
    {
      name: 'Companies',
      description: 'Companies related APIs'
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
      name: 'Certificates',
      description: 'Certificates related APIs'
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
  ...certificatesPaths,
  ...whatsappPaths,
  ...locationsPaths,
  ...companiesPaths
}

export const components = {
  schemas: {
    signUp: signupSchema,
    token: tokenSchema,
    error: errorSchema,
    login: loginSchema,
    account: accountSchema,
    accounts: accountsSchema,
    changePassword: changePasswordSchema,
    address: map(addressSchema, ['id', 'accountId']),
    saveChildren: map(childrenSchema, ['id', 'accountId']),
    children: map(childrenSchema, ['accountId']),
    childrens: childrensSchema,
    id: idSchema,
    invoice: invoiceSchema,
    invoices: invoicesSchema,
    createInvoice: createInvoiceSchema,
    whatsappMessage: messageSchema,
    createCertificate: createCertificateSchema,
    certificate: certificateSchema,
    certificates: certificatesSchema,
    validCertificate: map(certificateSchema, ['type', 'name', 'hours']),
    zipAddress: map(addressSchema, ['id', 'accountId', 'number', 'complement', 'cityId', 'zip', 'country']),
    searchAccounts: searchAccountsSchema,
    procedures: proceduresSchema,
    procedure: procedureSchema,
    service: serviceSchema
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

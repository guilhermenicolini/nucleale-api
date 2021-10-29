import { Authentication } from '@/domain/usecases'

import faker from 'faker'

export const mockAuthenticationParams = (): Authentication.Params => ({
  accountId: faker.datatype.uuid(),
  userId: faker.datatype.uuid(),
  role: faker.random.word()
})

export const mockPasswordRecoveryRequest = () => ({
  email: faker.internet.email()
})

export const mockCheckPasswordRequest = () => ({
  token: faker.datatype.uuid()
})

export const mockChangePasswordHttpRequest = () => ({
  token: faker.datatype.uuid(),
  password: 'P@ssw0rd',
  passwordConfirmation: 'P@ssw0rd'
})

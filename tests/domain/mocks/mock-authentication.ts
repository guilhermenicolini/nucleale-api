import { Authentication } from '@/domain/usecases'

export const mockAuthenticationParams = (): Authentication.Params => ({
  accountId: 'any_id',
  userId: 'any_id',
  role: 'any'
})

export const mockPasswordRecoveryRequest = () => ({
  email: 'mail@inbox.me'
})

export const mockCheckPasswordRequest = () => ({
  token: 'any_id'
})

export const mockChangePasswordHttpRequest = () => ({
  token: 'any_id',
  password: 'P@ssw0rd',
  passwordConfirmation: 'P@ssw0rd'
})

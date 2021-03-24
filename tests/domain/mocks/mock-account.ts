import { AddAccount } from '@/domain/usecases'

import faker from 'faker'

export const mockAddAccountParams = (): AddAccount.Params => ({
  email: faker.internet.email(),
  password: 'P@ssw0rd'
})

export const mockVerifyccountParams = (): AddAccount.Params => ({
  email: faker.internet.email(),
  password: 'P@ssw0rd'
})

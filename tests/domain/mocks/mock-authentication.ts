import { Authentication } from '@/domain/usecases'

import faker from 'faker'

export const mockAuthenticationParams = (): Authentication.Params => ({
  accountId: faker.random.uuid(),
  userId: faker.random.uuid()
})

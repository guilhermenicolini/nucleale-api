import { Authentication } from '@/domain/usecases'

import faker from 'faker'

export const mockAuthenticationParams = (): Authentication.Params => ({
  accountId: faker.datatype.uuid(),
  userId: faker.datatype.uuid(),
  role: faker.random.word()
})

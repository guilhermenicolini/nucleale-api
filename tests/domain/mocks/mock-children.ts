import { ChildrenModel, Gender } from '@/domain/models'

import faker from 'faker'
import { ObjectId } from 'mongodb'

export const mockAddChildrenModel = (): Omit<ChildrenModel, 'id'> => ({
  accountId: new ObjectId().toString(),
  name: faker.name.findName(),
  birth: faker.random.number({
    min: 1609459200000,
    max: 1612051200000
  }),
  gender: Gender.female
})

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

export const mockResultChildrenModel = (): Omit<ChildrenModel, 'accountId'> => ({
  id: new ObjectId().toString(),
  name: faker.name.findName(),
  birth: faker.random.number({
    min: 1609459200000,
    max: 1612051200000
  }),
  gender: Gender.female
})

export const mockChildrenModel = (accountId: string) => ({
  _id: new ObjectId(),
  accountId: new ObjectId(accountId),
  name: faker.name.findName(),
  birth: faker.random.number({
    min: 1609459200000,
    max: 1612051200000
  }),
  gender: Gender.female
})

import { ChildrenModel, Gender } from '@/domain/models'

import faker from 'faker'
import { ObjectId } from 'mongodb'

export const mockAddChildrenModel = (): Omit<ChildrenModel, 'id'> => {
  const gender = faker.random.boolean() === true ? 1 : 0
  return {
    accountId: new ObjectId().toString(),
    name: faker.name.findName(),
    birth: faker.random.number({
      min: 1609459200000,
      max: 1612051200000
    }),
    gender: gender === 0 ? Gender.male : Gender.female
  }
}

export const mockResultChildrenModel = (): Omit<ChildrenModel, 'accountId'> => {
  const gender = faker.random.boolean() === true ? 1 : 0
  return {
    id: new ObjectId().toString(),
    name: faker.name.findName(),
    birth: faker.random.number({
      min: 1609459200000,
      max: 1612051200000
    }),
    gender: gender === 0 ? Gender.male : Gender.female
  }
}

export const mockChildrenModel = (accountId?: string) => {
  const gender = faker.random.boolean() === true ? 1 : 0
  return {
    _id: new ObjectId(),
    accountId: accountId ? new ObjectId(accountId) : new ObjectId(),
    name: faker.name.findName(),
    birth: faker.random.number({
      min: 1609459200000,
      max: 1612051200000
    }),
    gender: gender === 0 ? Gender.male : Gender.female
  }
}

export const mockUpdateChildrenModel = (id?: string, accountId?: string): ChildrenModel => {
  const gender = faker.random.boolean() === true ? 1 : 0
  return {
    id: id ? new ObjectId(id).toString() : new ObjectId().toString(),
    accountId: accountId ? new ObjectId(accountId).toString() : new ObjectId().toString(),
    name: faker.name.findName(null, null, gender),
    birth: faker.random.number({
      min: 1609459200000,
      max: 1612051200000
    }),
    gender: gender === 0 ? Gender.male : Gender.female
  }
}

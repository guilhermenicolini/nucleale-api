import { ChildrenModel, Gender } from '@/domain/models'

import { ObjectId } from 'mongodb'

export const mockAddChildrenModel = (): Omit<ChildrenModel, 'id'> => {
  return {
    accountId: new ObjectId().toString(),
    name: 'any_name',
    birth: 315543600000,
    gender: Gender.male
  }
}

export const mockResultChildrenModel = (): Omit<ChildrenModel, 'accountId'> => {
  return {
    id: new ObjectId().toString(),
    name: 'any_name',
    birth: 315543600000,
    gender: Gender.male
  }
}

export const mockChildrenModel = (accountId?: string) => {
  return {
    _id: new ObjectId(),
    accountId: accountId ? new ObjectId(accountId) : new ObjectId(),
    name: 'any_name',
    birth: 315543600000,
    gender: Gender.male
  }
}

export const mockUpdateChildrenModel = (id?: string, accountId?: string): ChildrenModel => {
  return {
    id: id ? new ObjectId(id).toString() : new ObjectId().toString(),
    accountId: accountId ? new ObjectId(accountId).toString() : new ObjectId().toString(),
    name: 'any_name',
    birth: 315543600000,
    gender: Gender.male
  }
}

export const mockUpdateChildrenBody = (id?: string, accountId?: string): ChildrenModel => {
  return {
    id: id ? new ObjectId(id).toString() : new ObjectId().toString(),
    accountId: accountId ? new ObjectId(accountId).toString() : new ObjectId().toString(),
    name: 'any_name',
    birth: 315543600000,
    gender: Gender.male
  }
}

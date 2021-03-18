import { Hasher } from '@/data/protocols'

import faker from 'faker'

export class HasherSpy implements Hasher {
  plainText: string
  result = faker.random.uuid()

  async hash (plainText: string): Promise<string> {
    this.plainText = plainText
    return this.result
  }
}

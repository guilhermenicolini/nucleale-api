import { Hasher, Signer } from '@/data/protocols'

import faker from 'faker'

export class HasherSpy implements Hasher {
  plainText: string
  result = faker.random.uuid()

  async hash (plainText: string): Promise<string> {
    this.plainText = plainText
    return this.result
  }
}

export class SignerSpy implements Signer {
  data: any
  result = faker.random.uuid()

  async sign (data: any): Promise<string> {
    this.data = data
    return this.result
  }
}

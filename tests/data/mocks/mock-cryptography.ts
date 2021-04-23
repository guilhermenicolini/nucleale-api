import { Hasher, Signer, HashComparer, Decrypter, Transformer } from '@/data/protocols'

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

export class HashComparerSpy implements HashComparer {
  plainText: string
  digest: string
  result = true

  async compare (plainText: string, digest: string): Promise<boolean> {
    this.plainText = plainText
    this.digest = digest
    return this.result
  }
}

export class DecrypterSpy implements Decrypter {
  ciphertext: any
  result = {
    sub: faker.random.uuid(),
    acc: faker.random.uuid(),
    role: faker.random.word()
  }

  async decrypt (ciphertext: any): Promise<any> {
    this.ciphertext = ciphertext
    return this.result
  }
}

export class TransformerSpy implements Transformer {
  data: any
  result: any = 'any_data'

  transform (data: any): any {
    this.data = data
    return this.result
  }
}

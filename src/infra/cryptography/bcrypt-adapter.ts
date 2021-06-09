import { Hasher, HashComparer } from '@/data/protocols'

import bcrypt from 'bcrypt'

export class BCryptAdapter implements Hasher<string, string>, HashComparer {
  constructor (private readonly salt: number) { }

  async hash (plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.salt)
  }

  async compare (plainText: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plainText, digest)
  }
}

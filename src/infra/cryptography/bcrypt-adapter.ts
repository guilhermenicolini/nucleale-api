import { Hasher } from '@/data/protocols'

import bcrypt from 'bcrypt'

export class BCryptAdapter implements Hasher {
  constructor (private readonly salt: number) { }

  async hash (plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.salt)
  }
}

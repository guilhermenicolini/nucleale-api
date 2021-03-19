import { Signer } from '@/data/protocols'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements Signer {
  constructor (private readonly secret: string) { }

  async sign (data: any): Promise<string> {
    return jwt.sign(data, this.secret)
  }
}

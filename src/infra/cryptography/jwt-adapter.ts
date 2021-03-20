import { Signer } from '@/data/protocols'
import env from '@/main/config/env'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements Signer {
  constructor (private readonly secret: string) { }

  async sign (data: any): Promise<string> {
    const payload = {
      ...data,
      iss: env.iss,
      aud: env.aud
    }
    return jwt.sign(payload, this.secret, { expiresIn: env.exp })
  }
}

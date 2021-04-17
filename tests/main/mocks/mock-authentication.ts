import { ObjectId } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '@/main/config/env'

export const mockAccessToken = () => {
  const acc = new ObjectId().toString()
  return {
    accessToken: sign({
      sub: new ObjectId().toString(),
      acc,
      role: 'user',
      iss: env.iss,
      aud: env.aud
    }, env.secret, { expiresIn: env.exp }),
    accoundId: acc
  }
}

export const mockInvalidAccessToken = () => {
  return sign({
    sub: new ObjectId().toString(),
    acc: new ObjectId().toString(),
    role: 'user',
    iss: env.iss,
    aud: env.aud
  }, env.secret, { expiresIn: 0 })
}

export const mockAdminAccessToken = () => {
  return sign({
    sub: new ObjectId().toString(),
    acc: new ObjectId().toString(),
    role: 'admin',
    iss: env.iss,
    aud: env.aud
  }, env.secret, { expiresIn: env.exp })
}

export const mockId = () => {
  return new ObjectId().toString()
}

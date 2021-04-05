import env from '@/main/config/env'
import { LoadAccountByToken } from '@/domain/usecases'
import { DbLoadAccountByToken } from '@/data/usecases'
import { JwtAdapter } from '@/infra/cryptography'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.secret)
  return new DbLoadAccountByToken(jwtAdapter)
}

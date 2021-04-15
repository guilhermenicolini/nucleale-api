import { TokenAuthentication } from '@/data/usecases'
import { Authentication } from '@/domain/usecases'
import { JwtAdapter } from '@/infra/cryptography'
import env from '@/main/config/env'

export const makeTokenAuthentication = (): Authentication => {
  const jwtAdapter = new JwtAdapter(env.secret)
  return new TokenAuthentication(jwtAdapter)
}

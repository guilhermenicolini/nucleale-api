import { Mapper } from '@/infra/db/protocols'

class AccountMapper implements Mapper {
  map (data: any): any {
    const { _id, accountId, ...rest } = data
    return { id: _id.toString(), accountId: accountId.toString(), ...rest }
  }
}

class IdMapper implements Mapper {
  map (data: any): any {
    const { _id, ...rest } = data
    return { id: _id.toString(), ...rest }
  }
}

export const accountMapper = (): Mapper => new AccountMapper()
export const idMapper = (): Mapper => new IdMapper()

import { Mapper } from '@/infra/db/protocols'

class AccountMapper implements Mapper {
  map (data: any): any {
    const { _id, accountId, ...rest } = data
    return { ...rest, id: _id.toString(), accountId: accountId.toString() }
  }
}

class IdMapper implements Mapper {
  map (data: any): any {
    const { _id, ...rest } = data
    return { ...rest, id: _id.toString() }
  }
}

export const accountMapper = (): Mapper => new AccountMapper()
export const idMapper = (): Mapper => new IdMapper()

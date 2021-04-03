import { Mapper } from '@/infra/db/protocols'

class AccountMapper implements Mapper {
  map (data: any): any {
    const { _id, accountId, ...rest } = data
    return { ...rest, id: _id.toString(), accountId: accountId.toString() }
  }
}

export const accountMapper = (): Mapper => {
  return new AccountMapper()
}

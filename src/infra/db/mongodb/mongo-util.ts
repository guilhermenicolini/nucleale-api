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

class SubAccountMapper implements Mapper {
  map (data: any): any {
    data.id = data._id.toString()
    delete data._id
    for (const acc of data.accounts) {
      const { _id } = acc
      acc.id = _id.toString()
      delete acc.accountId
      delete acc._id
    }
    for (const chd of data.childrens) {
      const { _id } = chd
      chd.id = _id.toString()
      delete chd.accountId
      delete chd._id
    }
    if (data.address) {
      data.address.id = data.address._id.toString()
      delete data.address._id
      delete data.address.accountId
    }
    return data
  }
}

export const accountMapper = (): Mapper => new AccountMapper()
export const idMapper = (): Mapper => new IdMapper()
export const subAccountMapper = (): Mapper => new SubAccountMapper()

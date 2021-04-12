export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<AddAccount.Result>
}

export namespace AddAccount {

  export type Status = 'active' | 'awaitingVerification'

  export type Params = {
    accountId: string
    taxId: string
    name: string
    email: string
    password: string
    mobilePhone: string
    birth: number
    status: Status,
    role: string
  }

  export type Result = {
    isValid: boolean
    accountId: string
    userId: string
    role: string
  }
}

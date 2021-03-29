export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<AddAccount.Result>
}

export namespace AddAccount {
  export type Params = {
    accountId: string
    taxId: string
    name: string
    email: string
    password: string
    mobileCountry: string
    mobilePhone: string
    birth: number
  }

  export type Result = {
    isValid: boolean
    accountId: string
    userId: string
  }
}

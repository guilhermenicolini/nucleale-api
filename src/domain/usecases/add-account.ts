export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<AddAccount.Result>
}

export namespace AddAccount {
  export type Params = {
    email: string
    password: string
  }

  export type Result = {
    isValid: boolean
    accountId: string
    userId: string
  }
}

export interface VerifyAccount {
  verify: (params: VerifyAccount.Params) => Promise<VerifyAccount.Result>
}

export namespace VerifyAccount {
  export type Params = {
    email: string
    password: string
  }

  export type Result = {
    accountId: string
    userId: string
    role: string
  }
}

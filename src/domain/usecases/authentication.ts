export interface Authentication {
  auth: (params: Authentication.Params) => Promise<Authentication.Result>
}

export namespace Authentication {
  export type Params = {
    accountId: string
    userId: string
    role: string
  }

  export type Result = {
    accessToken: string
  }
}

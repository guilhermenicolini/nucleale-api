export interface ChangePassword {
  change: (params: ChangePassword.Params) => Promise<ChangePassword.Result>
}

export namespace ChangePassword {
  export type Params = {
    token: string
    password: string
  }

  export type Result = void | Error
}

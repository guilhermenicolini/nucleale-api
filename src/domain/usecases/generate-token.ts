export interface GenerateToken {
  generate: (params: GenerateToken.Params) => GenerateToken.Result
}

export namespace GenerateToken {
  export type Params = {
    accountId: string
    userId: string
  }

  export type Result = string
}

export interface CheckAccountLink {
  check: (token: string) => Promise<CheckAccountLink.Result>
}

export namespace CheckAccountLink {
  export type Result = boolean
}

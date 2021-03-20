export interface CheckAccountByEmailRepository {
  check: (email: string) => Promise<CheckAccountByEmailRepository.Result>
}

export namespace CheckAccountByEmailRepository {
  export type Result = boolean
}

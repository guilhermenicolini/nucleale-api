export interface LoadAccountByEmailRepository {
  load: (email: string) => Promise<LoadAccountByEmailRepository.Result>
}

export namespace LoadAccountByEmailRepository {
  export type Result = {
    accountId: string
    userId: string
    password: string
    role: string
  }
}

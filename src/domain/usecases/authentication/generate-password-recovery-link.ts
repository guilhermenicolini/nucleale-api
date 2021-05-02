import { AccountModel } from '@/domain/models'

export interface GeneratePasswordRecoveryLink {
  generate: (account: GeneratePasswordRecoveryLink.Model) => Promise<void>
}

export namespace GeneratePasswordRecoveryLink {
  export type Model = AccountModel
}

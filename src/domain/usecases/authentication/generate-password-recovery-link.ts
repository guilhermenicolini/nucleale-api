import { AccountModel } from '@/domain/models'

export interface GeneratePasswordRecoveryLink {
  generate: (account: AccountModel) => Promise<void>
}

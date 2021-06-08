import { AccountStatus, AccountRoles } from './enums'
export type AccountModel = {
  id: string
  accountId: string
  taxId: string
  registryId?: string
  name: string
  email: string
  mobilePhone: string
  birth: number
  status: AccountStatus
  password: string
  role: AccountRoles
}

export interface InviteAccount {
  invite: (accountId: string, email: string) => Promise<boolean>
}

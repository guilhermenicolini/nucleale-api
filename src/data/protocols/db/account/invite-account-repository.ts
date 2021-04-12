export interface InviteAccountRepository {
  inviteAccount: (accountId: string, email: string) => Promise<boolean>
}

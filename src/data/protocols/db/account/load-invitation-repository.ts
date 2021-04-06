export interface LoadInvitationRepository {
  loadInvitation: (email: string) => Promise<string>
}

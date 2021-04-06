export interface LoadInvitation {
  load: (email: string) => Promise<string>
}

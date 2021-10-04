export interface DeleteLinkRepository {
  delete: (token: string) => Promise<void>
}

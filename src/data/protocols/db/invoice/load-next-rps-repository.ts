export interface LoadNextRpsRepository {
  next: () => Promise<number>
}

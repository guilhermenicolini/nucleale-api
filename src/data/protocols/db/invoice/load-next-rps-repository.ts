export interface LoadNextRpsRepository {
  load: () => Promise<number>
}

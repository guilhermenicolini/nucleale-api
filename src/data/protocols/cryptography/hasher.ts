export interface Hasher<T, R> {
  hash: (plain: T) => Promise<R>
}

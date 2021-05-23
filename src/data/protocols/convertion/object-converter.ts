export interface ObjectConverter<T, R> {
  convert: (data: T) => Promise<R>
}

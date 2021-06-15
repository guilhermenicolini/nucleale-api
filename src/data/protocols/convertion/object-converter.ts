export interface ObjectConverter<T = any, R = any> {
  convert: (data: T) => Promise<R>
}

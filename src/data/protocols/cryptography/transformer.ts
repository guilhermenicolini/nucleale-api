export interface Transformer<T = any> {
  transform: (data: any) => T
}

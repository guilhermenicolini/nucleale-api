export interface Decoder<R = any> {
  decode: (data: any) => Promise<R>
}

export interface Decoder {
  decode: (data: any) => Promise<any>
}

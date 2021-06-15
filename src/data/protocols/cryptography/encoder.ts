export interface Encoder {
  encode: (data: any) => Promise<any>
}

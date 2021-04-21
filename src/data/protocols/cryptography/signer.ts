export interface Signer {
  sign: (data: any) => Promise<any>
}

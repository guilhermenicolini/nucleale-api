export interface Signer {
  sign: (data: any) => Promise<string>
}

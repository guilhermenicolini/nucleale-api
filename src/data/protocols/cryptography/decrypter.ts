export interface Decrypter {
  decrypt: (ciphertext: any) => Promise<any>
}

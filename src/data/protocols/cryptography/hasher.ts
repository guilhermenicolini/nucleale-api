export interface Hasher {
  hash: (plaintText: string) => Promise<string>
}

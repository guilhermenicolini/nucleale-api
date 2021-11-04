export interface SoapParser<T = any> {
  parse: (data: any) => Promise<T>
}

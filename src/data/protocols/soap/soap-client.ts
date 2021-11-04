export type SoapRequest = {
  url: string
  method: string
  responseMethod: string
  message: any
}

export type SoapResponse<T = any> = {
  success: boolean
  response?: T
  error?: Error
}

export interface SoapClient<R = any> {
  send: (request: SoapRequest) => Promise<SoapResponse<R>>
}

export type MessageModel = {
  email: string
  phone: string
  text: string
  html?: string
  file?: {
    name: string
    base64: string
  }
}

export type MessageModel = {
  subject?: string
  email: string
  phone: string
  text: string
  html?: string
  file?: {
    name: string
    base64: string
    mimeType: string
  }
}

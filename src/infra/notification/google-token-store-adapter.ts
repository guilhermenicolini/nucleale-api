import { tokenStore } from '@wppconnect-team/wppconnect'
import env from '@/main/config/env'
import { Storage } from '@google-cloud/storage'
import { SessionToken } from '@wppconnect-team/wppconnect/dist/token-store'

export class GoogleTokenStore implements tokenStore.TokenStore {
  async getToken (sessionName: string): Promise<SessionToken> {
    const bucket = new Storage().bucket(env.storageBucket)

    const file = bucket.file(`${env.storageTokenFolder}/${sessionName}.data.json`)
    const exists = await file.exists()
    if (!exists[0]) {
      return null
    }
    const data = await file.download()
    return JSON.parse(data.toString()) as SessionToken
  }

  async setToken (sessionName: string, token: SessionToken): Promise<boolean> {
    const bucket = new Storage().bucket(env.storageBucket)

    await bucket
      .file(`${env.storageTokenFolder}/${sessionName}.data.json`)
      .save(JSON.stringify(token))
    return true
  }

  async removeToken (sessionName: string): Promise<boolean> {
    const bucket = new Storage().bucket(env.storageBucket)

    const file = bucket.file(`${env.storageTokenFolder}/${sessionName}.data.json`)
    const exists = await file.exists()
    if (!exists[0]) {
      return false
    }

    await file.delete()
    return true
  }

  async listTokens (): Promise<string[]> {
    const bucket = new Storage().bucket(env.storageBucket)
    const result = await bucket
      .getFiles({ prefix: `${env.storageTokenFolder}/` })
    return result[0].map(file => file.name.replace(`${env.storageTokenFolder}/`, ''))
  }
}

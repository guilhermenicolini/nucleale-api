import { FileStorage } from '@/data/protocols'
import { Bucket, Storage } from '@google-cloud/storage'

export class GoogleCloudStorageAdapter implements FileStorage {
  private readonly bucket: Bucket
  constructor (
    private readonly bucketName: string
  ) {
    this.bucket = new Storage().bucket(this.bucketName)
  }

  async get (fileName: string): Promise<Buffer> {
    const file = this.bucket.file(fileName)
    const exists = await file.exists()
    if (!exists[0]) {
      return null
    }
    const buffer = await file.download()
    return buffer[0]
  }

  async save (fileName: string, data: any): Promise<void> {
    await this.bucket
      .file(fileName)
      .save(data)
  }

  async remove (fileName: string): Promise<void> {
    const file = this.bucket.file(fileName)
    const exists = await file.exists()
    if (!exists[0]) {
      return
    }
    await file.delete()
  }

  async getFiles (folder: string): Promise<string[]> {
    const result = await this.bucket
      .getFiles({ prefix: `${folder}/` })
    return result[0].map(file => file.name.replace(`${folder}/`, ''))
  }
}

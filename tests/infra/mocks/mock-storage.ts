import { FileStorage } from '@/data/protocols'

export class FileStorageSpy implements FileStorage {
  fileName: string
  data: any
  folder: string
  result: Buffer = Buffer.from('{ "foo": "bar" }', 'utf-8')
  resultList: string[] = ['file1', 'file2']

  async get (fileName: string): Promise<Buffer> {
    this.fileName = fileName
    return this.result
  }

  async save (fileName: string, data: any): Promise<void> {
    this.fileName = fileName
    this.data = data
  }

  async remove (fileName: string): Promise<void> {
    this.fileName = fileName
  }

  async getFiles (folder: string): Promise<string[]> {
    this.folder = folder
    return this.resultList
  }
}

export interface FileStorage {
  get: (fileName: string) => Promise<Buffer>
  save: (fileName: string, data: any) => Promise<void>
  remove: (fileName: string) => Promise<void>
  getFiles: (folder: string) => Promise<string[]>
}

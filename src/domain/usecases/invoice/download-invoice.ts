export interface DownloadInvoice {
  download: (id: string, accountId: string) => Promise<any>
}

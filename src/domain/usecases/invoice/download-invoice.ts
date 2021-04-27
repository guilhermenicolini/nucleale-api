export interface DownloadInvoice {
  download: (id: string, accountId: string) => Promise<DownloadInvoice.Result>
}

export namespace DownloadInvoice {
  export type Result = {
    fileName: string
    pdf: any
  }
}

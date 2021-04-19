export interface DeleteChildren {
  delete: (params: DeleteChildren.Params) => Promise<boolean>
}

export namespace DeleteChildren {
  export type Params = {
    accountId: string
    id: string
  }
}

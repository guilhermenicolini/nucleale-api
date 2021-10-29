export const throwError = (): never => {
  throw new Error()
}

export const throwCustomError = (error: Error): never => {
  throw error
}

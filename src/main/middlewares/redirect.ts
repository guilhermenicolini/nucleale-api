import { Request, Response, NextFunction } from 'express'

export const redirect = (url: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    res.redirect(url)
  }
}

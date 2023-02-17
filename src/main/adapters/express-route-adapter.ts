import { Controller } from '@/presentation/protocols'

import { Request, Response } from 'express'

const handleParams = (params: any): any => {
  const { iId, ...rest } = params

  return {
    iId: parseInt(iId),
    ...rest
  }
}

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      ...(req.body),
      ...handleParams(req.params),
      ...(req.query),
      userId: req.userId,
      accountId: req.accountId,
      files: req.files
    }
    const httpResponse = await controller.handle(httpRequest)
    console.log(JSON.stringify({ httpRequest, httpResponse }, null, 2))
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      if (httpResponse.body?.fileName) {
        res.setHeader('Content-Disposition', `inline; filename="${httpResponse.body.fileName}"`)
        res.setHeader('Content-Type', 'application/pdf')
        res.status(200).end(httpResponse.body.buffer)
      } else {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      }
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}

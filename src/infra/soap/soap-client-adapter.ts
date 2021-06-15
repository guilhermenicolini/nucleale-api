import { SoapClient, SoapRequest, SoapResponse } from '@/data/protocols'
import { SoapError } from '@/presentation/errors'
import { createClient } from 'soap'

export class SoapClientAdapter implements SoapClient<any> {
  async send (request: SoapRequest): Promise<SoapResponse<any>> {
    return new Promise((resolve, reject) => {
      createClient(request.url, (err, client) => {
        if (err) {
          return reject(err)
        }
        client[request.method](request.message, (err, result) => {
          if (err) {
            return resolve({
              success: false,
              error: err
            })
          } else {
            const value = result[`${request.method}Return`]?.$value || 'missing $value'
            if (!value.includes('?xml')) {
              return resolve({
                success: false,
                error: new SoapError(value)
              })
            }
            return resolve({
              success: true,
              response: value
            })
          }
        })
      })
    })
  }
}

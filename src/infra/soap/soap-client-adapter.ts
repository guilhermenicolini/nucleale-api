import { SoapClient, SoapParser, SoapRequest, SoapResponse } from '@/data/protocols'
import { createClient } from 'soap'

export class SoapClientAdapter implements SoapClient<any> {
  constructor (private readonly parser: SoapParser) {}

  async send (request: SoapRequest): Promise<SoapResponse<any>> {
    return new Promise((resolve, reject) => {
      createClient(request.url, (err, client) => {
        if (err) {
          return reject(err)
        }
        client[request.method](request.message, async (err, result) => {
          if (err) {
            return resolve({
              success: false,
              error: err
            })
          } else {
            try {
              return resolve({
                success: true,
                response: await this.parser.parse(result[request.responseMethod])
              })
            } catch (error) {
              return resolve({
                success: false,
                error
              })
            }
          }
        })
      })
    })
  }
}

import { Converter, Transformer } from '@/data/protocols'
import { GenerateInvoice } from '@/domain/usecases'

export class IoGenerateInvoice implements GenerateInvoice {
  constructor (
    private readonly converter: Converter,
    private readonly transformer: Transformer
  ) { }

  async generate (model: GenerateInvoice.Model): Promise<GenerateInvoice.Result> {
    const document = this.converter.convert(model)
    const pdf = await this.transformer.transform(document)

    return new Promise((resolve, reject) => {
      pdf.toBuffer((err, buffer) => {
        if (err) {
          return reject(err)
        }
        resolve({
          fileName: `nf${model.invoiceNo}.pdf`,
          buffer
        })
      })
    })
  }
}

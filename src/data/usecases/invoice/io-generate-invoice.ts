import { Converter, Transformer } from '@/data/protocols'
import { GenerateInvoice } from '@/domain/usecases'

export class IoGenerateInvoice implements GenerateInvoice {
  constructor (
    private readonly converter: Converter,
    private readonly transformer: Transformer
  ) { }

  async generate (model: GenerateInvoice.Model): Promise<GenerateInvoice.Result> {
    const document = this.converter.convert(model)
    const result = this.transformer.transform(document)
    return result
  }
}

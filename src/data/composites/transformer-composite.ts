import { Transformer } from '@/data/protocols'

export class TransformerComposite implements Transformer {
  constructor (private readonly transformers: Transformer[]) { }

  transform (data: any): any {
    let response = data
    for (const transformer of this.transformers) {
      response = transformer.transform(response)
    }
    return response
  }
}

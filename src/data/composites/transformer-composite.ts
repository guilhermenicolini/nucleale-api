import { Transformer } from '@/data/protocols'

export class TransformerComposite implements Transformer {
  constructor (
    private readonly transformers: Transformer[]
  ) { }

  transform (data: any): any {
    const response = {}
    for (const transformer of this.transformers) {
      Object.assign(response, transformer.transform(data))
    }
    return response
  }
}

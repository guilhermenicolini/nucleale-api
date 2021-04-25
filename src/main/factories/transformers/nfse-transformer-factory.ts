import { TransformerComposite } from '@/data/composites'
import { Transformer } from '@/data/protocols'
import { NfseTransformer, NfsePersonTransformer, NfseItemsTransformer } from '@/infra/transformers'

export const makeNfseTransformerComposite = (): TransformerComposite => {
  const transformers: Transformer[] = []
  transformers.push(new NfseTransformer())
  transformers.push(new NfsePersonTransformer('taker', 'TOMADOR'))
  transformers.push(new NfsePersonTransformer('provider', 'PRESTADOR', 'PREST'))
  transformers.push(new NfseItemsTransformer())
  return new TransformerComposite(transformers)
}

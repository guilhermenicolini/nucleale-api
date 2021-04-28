import { TransformerComposite } from '@/data/composites'
import { Transformer } from '@/data/protocols'
import { NfseTransformer, NfsePersonTransformer, NfseItemsTransformer } from '@/infra/transformers'
import { MomentAdapter } from '@/infra/manipulation'

export const makeNfseTransformerComposite = (): TransformerComposite => {
  const transformers: Transformer[] = []
  transformers.push(new NfseTransformer(new MomentAdapter()))
  transformers.push(new NfsePersonTransformer('taker', 'TOMADOR'))
  transformers.push(new NfsePersonTransformer('provider', 'PRESTADOR', 'PREST'))
  transformers.push(new NfseItemsTransformer())
  return new TransformerComposite(transformers)
}

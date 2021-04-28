import { makeNfseTransformerComposite } from '@/main/factories'
import { Transformer } from '@/data/protocols'
import { TransformerComposite } from '@/data/composites'
import { NfseTransformer, NfsePersonTransformer, NfseItemsTransformer } from '@/infra/transformers'
import { MomentAdapter } from '@/infra/manipulation'

jest.mock('@/data/composites/transformer-composite')

describe('NfseTransformerComposite Factory', () => {
  test('Should call TransformerComposite with all transformers', () => {
    makeNfseTransformerComposite()
    const transformers: Transformer[] = []
    transformers.push(new NfseTransformer(new MomentAdapter()))
    transformers.push(new NfsePersonTransformer('taker', 'TOMADOR'))
    transformers.push(new NfsePersonTransformer('provider', 'PRESTADOR', 'PREST'))
    transformers.push(new NfseItemsTransformer())
    expect(TransformerComposite).toHaveBeenCalledWith(transformers)
  })
})

import { IoLoadInvoices } from '@/data/usecases'
import { LoadInvoicesFromBuffer } from '@/domain/usecases'
import { XmlConverterAdapter } from '@/infra/cryptography'
import { makeNfseTransformerComposite } from '@/main/factories'

export const makeIoLoadInvoices = (): LoadInvoicesFromBuffer => {
  const xmlConverterAdapter = new XmlConverterAdapter('latin1')
  return new IoLoadInvoices(xmlConverterAdapter, makeNfseTransformerComposite())
}

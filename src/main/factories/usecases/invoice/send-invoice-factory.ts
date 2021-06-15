import { RemoteSendInvoice } from '@/data/usecases'
import { SendInvoice } from '@/domain/usecases'
import { InvoiceToRpsConverter } from '@/infra/converters'
import { NfseHasherAdapter, XmlConverterAdapter, XmlSignerAdapter } from '@/infra/cryptography'
import { NfsePhoneAdapter, NfseTimeAdapter } from '@/infra/manipulation'
import { SoapClientAdapter } from '@/infra/soap'
import { GoogleCloudStorageAdapter } from '@/infra/storage/google-cloud-storage-adapter'
import env from '@/main/config/env'

export const makeRemoteSendInvoice = (): SendInvoice => {
  const xmlConverterAdapter = new XmlConverterAdapter('latin1')
  const nfseTimeAdapter = new NfseTimeAdapter()
  return new RemoteSendInvoice(
    new InvoiceToRpsConverter(nfseTimeAdapter, new NfsePhoneAdapter(), new NfseHasherAdapter(nfseTimeAdapter)),
    xmlConverterAdapter,
    new XmlSignerAdapter('Lote', new GoogleCloudStorageAdapter(env.storageBucket)),
    new SoapClientAdapter(),
    xmlConverterAdapter
  )
}

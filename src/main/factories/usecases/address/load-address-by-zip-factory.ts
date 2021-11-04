import { RemoteLoadAddressByZip } from '@/data/usecases'
import { LoadAddressByZip } from '@/domain/usecases'
import { CepParser, SoapClientAdapter } from '@/infra/soap'

export const makeRemoteLoadAddressByZip = (): LoadAddressByZip => {
  return new RemoteLoadAddressByZip(new SoapClientAdapter(new CepParser()))
}

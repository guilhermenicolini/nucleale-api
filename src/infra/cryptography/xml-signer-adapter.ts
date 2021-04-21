import { Signer } from '@/data/protocols'

import { SignedXml } from 'xml-crypto'

export class XmlSignerAdapter implements Signer {
  constructor (
    private readonly tag: string,
    private readonly key: Buffer,
    private readonly cert: Buffer
  ) { }

  async sign (data: any): Promise<any> {
    const signer = new SignedXml()
    signer.computeSignature(data)
    const signedXml = signer.getSignedXml()
    return signedXml
  }
}

import { FileStorage, Signer } from '@/data/protocols'

import { SignedXml } from 'xml-crypto'

const getX509Cert = (certificate) => {
  const cert = certificate.toString()
  const start = cert.indexOf('-----BEGIN CERTIFICATE-----') + 27
  const end = cert.indexOf('-----END CERTIFICATE-----')
  return cert.substring(start, end).replace(/\r?\n|\r/g, '')
}

function KeyProvider (certificate) {
  this.getKeyInfo = function () {
    return `<X509Data><X509Certificate>${getX509Cert(
      certificate
    )}</X509Certificate></X509Data>`
  }
}

export class XmlSignerAdapter implements Signer {
  constructor (
    private readonly tag: string,
    private readonly fileStorage: FileStorage
  ) { }

  async sign (data: any): Promise<any> {
    const certificate = await this.fileStorage.get('certificate/certificate.cer')
    const privateKey = await this.fileStorage.get('certificate/private.key')
    const signer = new SignedXml()
    signer.keyInfoProvider = new KeyProvider(certificate)
    signer.canonicalizationAlgorithm =
      'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'
    signer.addReference(
      `//*[local-name(.)='${this.tag}']`,
      [
        'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
        'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'
      ],
      'http://www.w3.org/2000/09/xmldsig#sha1',
      '',
      '',
      '',
      false
    )
    signer.signingKey = privateKey
    signer.computeSignature(data)
    return signer.getSignedXml()
  }
}

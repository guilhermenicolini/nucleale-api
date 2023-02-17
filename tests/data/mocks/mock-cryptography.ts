import {
  Hasher,
  Signer,
  HashComparer,
  Decrypter,
  Transformer,
  ObjectConverter,
  Decoder,
  Encoder
} from '@/data/protocols'
import { InvoiceModel, RpsLoteResultModel } from '@/domain/models'

export class HasherSpy implements Hasher<string, string> {
  plainText: string
  result = 'any_id'

  async hash (plainText: string): Promise<string> {
    this.plainText = plainText
    return this.result
  }
}

export class HasherInvoiceSpy implements Hasher<InvoiceModel, string> {
  plain: InvoiceModel
  result = 'any_id'

  async hash (plain: InvoiceModel): Promise<string> {
    this.plain = plain
    return this.result
  }
}

export class SignerSpy implements Signer {
  data: any
  result = 'any_id'

  async sign (data: any): Promise<string> {
    this.data = data
    return this.result
  }
}

export class HashComparerSpy implements HashComparer {
  plainText: string
  digest: string
  result = true

  async compare (plainText: string, digest: string): Promise<boolean> {
    this.plainText = plainText
    this.digest = digest
    return this.result
  }
}

export class DecrypterSpy implements Decrypter {
  ciphertext: any
  result = {
    sub: 'any_id',
    acc: 'any_id',
    role: 'any_value'
  }

  async decrypt (ciphertext: any): Promise<any> {
    this.ciphertext = ciphertext
    return this.result
  }
}

export class NfseDecoderSpy implements Decoder {
  data: any
  result = {
    NOTAS_FISCAIS: {
      NOTA_FISCAL: ['any_nfse_1', 'any_nfse_2']
    }
  }

  async decode (data: any): Promise<any> {
    this.data = data
    return this.result
  }
}

export class TransformerSpy implements Transformer {
  data: any
  result: any = { any_key: 'any_value' }

  transform (data: any): any {
    this.data = data
    return this.result
  }
}

export class PdfTransformerSpy implements Transformer {
  data: any
  result: any = 'any_data'

  transform (data: any): any {
    this.data = data
    return this.result
  }
}

export class ObjectConverterSpy implements ObjectConverter {
  data: any
  result: any = 'any_value'

  convert (data: any): any {
    this.data = data
    return this.result
  }
}

export class RpsEncoderSpy implements Encoder {
  data: any
  result = {}

  async encode (data: any): Promise<any> {
    this.data = data
    return this.result
  }
}

export class RpsDecoderSpy implements Decoder {
  data: any
  result: RpsLoteResultModel = {
    'ns1:RetornoEnvioLoteRPS': {
      ChavesNFSeRPS: {
        ChaveNFSeRPS: {
          ChaveNFe: {
            NumeroNFe: 'any_number',
            CodigoVerificacao: 'any_value'
          }
        }
      }
    }
  }

  async decode (data: any): Promise<any> {
    this.data = data
    return this.result
  }
}

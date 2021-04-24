import { Transformer } from '@/data/protocols'
import { InvoiceItemModel } from '@/domain/models'
import { parseMoney } from '@/infra/utils'

export class NfseItemsTransformer implements Transformer<any> {
  transform (data: any): any {
    const list = []
    for (const item of data.ITENS.ITEM) {
      const obj: InvoiceItemModel = {
        taxable: item.TRIBUTAVEL === 'S',
        description: item.DESCRICAO
          ? item.DESCRICAO.toUpperCase()
          : '',
        quantity: item.QUANTIDADE,
        unitValue: parseMoney(item.VALOR_UNITARIO),
        totalValue: parseFloat(item.VALOR_TOTAL)
      }
      list.push(obj)
    }
    return list
  }
}

import { Transformer } from '@/data/protocols'
import { InvoiceItemModel } from '@/domain/models'
import { parseMoney } from '@/infra/utils'

export class NfseItemsTransformer implements Transformer<any> {
  transform (data: any): any {
    const list = []
    if (Array.isArray(data.ITENS.ITEM)) {
      for (const item of data.ITENS.ITEM) {
        const obj: InvoiceItemModel = {
          taxable: item.TRIBUTAVEL === 'S',
          description: item.DESCRICAO.toUpperCase(),
          quantity: item.QUANTIDADE,
          unitValue: parseMoney(item.VALOR_UNITARIO),
          totalValue: parseFloat(item.VALOR_TOTAL)
        }
        list.push(obj)
      }
    } else {
      const obj: InvoiceItemModel = {
        taxable: data.ITENS.ITEM.TRIBUTAVEL === 'S',
        description: data.ITENS.ITEM.DESCRICAO.toUpperCase(),
        quantity: data.ITENS.ITEM.QUANTIDADE,
        unitValue: parseMoney(data.ITENS.ITEM.VALOR_UNITARIO),
        totalValue: parseFloat(data.ITENS.ITEM.VALOR_TOTAL)
      }
      list.push(obj)
    }

    return {
      items: list
    }
  }
}

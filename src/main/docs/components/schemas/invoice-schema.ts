export const invoiceSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    invoiceNo: {
      type: 'number',
      format: 'int32'
    },
    invoiceDate: {
      type: 'number',
      format: 'milliseconds'
    },
    description: {
      type: 'string'
    }
  },
  required: ['id', 'invoiceNo', 'invoiceDate', 'description']
}

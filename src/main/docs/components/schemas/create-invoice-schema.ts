export const createInvoiceSchema = {
  type: 'object',
  properties: {
    user: {
      type: 'string'
    },
    procedure: {
      type: 'string'
    },
    amount: {
      type: 'number',
      format: 'float'
    },
    data: {
      type: 'string'
    }
  },
  required: ['user', 'procedure', 'amount']
}

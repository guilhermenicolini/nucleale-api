export const serviceSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    activity: {
      type: 'string'
    },
    aliquote: {
      type: 'number',
      format: 'int32'
    },
    cnae: {
      type: 'string'
    },
    operation: {
      type: 'string'
    },
    pickupType: {
      type: 'string'
    },
    service: {
      type: 'string'
    },
    taxation: {
      type: 'string'
    },
    taxable: {
      type: 'boolean'
    }
  },
  required: ['id', 'name', 'activity', 'aliquote', 'cnae', 'operation', 'pickupType', 'service', 'taxation', 'taxable']
}

const omit = (obj: any, field: string): any => {
  delete obj.properties[field]
  obj.required.splice(obj.required.indexOf(field), 1)
  return obj
}

export default (obj: any, fields: string[]): any => {
  const data = JSON.parse(JSON.stringify(obj))
  for (const field of fields) {
    omit(data, field)
  }
  return data
}

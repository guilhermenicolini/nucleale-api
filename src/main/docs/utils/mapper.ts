const omit = (obj: any, field: string): any => {
  delete obj.properties[field]
  obj.required.splice(obj.required.indexOf(field), 1)
  return obj
}

export default (obj: any, fields: string | string[]): any => {
  const data = JSON.parse(JSON.stringify(obj))
  if (Array.isArray(fields)) {
    for (const field of fields) {
      omit(data, field)
    }
  } else {
    omit(data, fields)
  }

  return data
}

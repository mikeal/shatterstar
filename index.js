
const restricted = [
  '\n',
  '+',
  '{',
  '}',
  '|',
  ','
]

const valid = key => {
  for (let r of restricted) {
    if (key.includes(r)) return false
  }
  return true
}

const parse = (obj, keys, depth=0) => {
  const line = []
  for (let key of keys) {
    if (key.startsWith('|')) {
      key = key.slice(1)
    }
    if (key.startsWith('+')) {
      key = key.slice(1)
    }
    if (typeof obj[key] === 'undefined') {
      line.push('')
    } else if (!Array.isArray(key)) {
      if (depth > 0) throw new Error('Array depth greater than one not allowed')
      line.push(parse(obj[key], key, depth+1)) 
    } else {
      line.push(obj[key])
    }
    delete obj[key]
  }
  for (let [key, value] of Object.entries(obj)) {
    if (!valid(key)) throw new Error(`"${key}" is an invalid key name.`)
    if (Array.isArray(value)) {
      line.push(value)
      keys.push(`|${key}`)
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      if (depth > 0) throw new Error('Vector depth greater than one not allowed')
      let _keys = [key]
      line.push(parse(value, _keys, depth+1))
      keys.push(_keys)
    } else if (typeof value === 'string') {
      if (!valid(value)) throw new Error(`"${value}" value cannot be encoded.`)
      line.push(value)
      keys.push(key)
    } else if (typeof value === 'number') {
      line.push(value)
      keys.push(`+${key}`)
    } else {
      throw new Error(`"${key}" is an unsupported value type: ${value}`)
    }
  }
  return line
}

const encode = arr => {
  
}

const writer = function * (db) {
  let keys = db.keys
  let values = db.values
  let keyline = header(keys, values)
  yield keyline
  for (let value of db.values) {

  }
}

class Database {
  constructor (keys=[], values=[]) {
    this.values = new Set(values)
    this.keys = keys
  }
  set (obj) {
    obj = Object.assign({}, obj)
    let line = parse(obj, this.keys)
    this.values.add(line)
  }
}


export default {
  groupBy(materials, key) {
    return materials.reduce(function (rv, x) {
      ;(rv[x[key]] = rv[x[key]] || []).push(x)

      return rv
    }, {})
  },

  addKey(materials, newKey, newValueKey) {
    const array = []
    for (const KEY in materials) {
      array.push({
        [newKey]: KEY,
        [newValueKey]: materials[KEY],
      })
    }

    return JSON.parse(JSON.stringify(array))
  },

  renameKeys(materials, oldKeys, newKeys) {
    return materials.map(function (material) {
      for (let i = 0; i < oldKeys.length; i++) {
        material[newKeys[i]] = material[oldKeys[i]]
        delete material[oldKeys[i]]
      }
      return material
    }, (oldKeys, newKeys))
  },

  orderBy(materials, key = String, mode = Boolean, asc = Boolean, sub = { keys: Array, mode: Boolean, asc: Boolean }) {
    // 全部昇順

    switch (mode) {
      case 'num':
        materials.sort((x, y) => {
          if (x[key] - y[key] !== 0 || !(sub.keys instanceof Array)) return x[key] - y[key]

          // 二つ目のソート条件
          sub.keys.forEach(e => {
            x = x[e]
            y = y[e]
          })

          switch (sub.mode) {
            case 'num':
              if (asc) {
                // 昇順(リバースなし)なら
                return sub.asc ? x - y : y - x
              } else {
                // 降順(リバースあり)なら
                return sub.asc ? y - x : x - y
              }

            case 'str':
              if (asc) {
                // 昇順(リバースなし)なら
                return sub.asc ? x.localeCompare(y, 'ja') : y.localeCompare(x, 'ja')
              } else {
                // 降順(リバースあり)なら
                return sub.asc ? y.localeCompare(x, 'ja') : x.localeCompare(y, 'ja')
              }
            default:
              if (asc) {
                // 昇順(リバースなし)なら
                return sub.asc ? x.length - y.length : y.length - x.length
              } else {
                // 降順(リバースあり)なら
                return sub.asc ? y.length - x.length : x.length - y.length
              }
          }
        })
        break
      case 'str':
        materials.sort((x, y) => {
          if (x[key].localeCompare(y[key], 'ja') !== 0 || !(sub.keys instanceof Array))
            return x[key].localeCompare(y[key], 'ja')

          sub.keys.forEach(e => {
            x = x[e]
            y = y[e]
          })

          switch (sub.mode) {
            case 'num':
              if (asc) {
                // 昇順(リバースなし)なら
                return sub.asc ? x - y : y - x
              } else {
                // 降順(リバースあり)なら
                return sub.asc ? y - x : x - y
              }

            case 'str':
              if (asc) {
                // 昇順(リバースなし)なら
                return sub.asc ? x.localeCompare(y, 'ja') : y.localeCompare(x, 'ja')
              } else {
                // 降順(リバースあり)なら
                return sub.asc ? y.localeCompare(x, 'ja') : x.localeCompare(y, 'ja')
              }
            default:
              if (asc) {
                // 昇順(リバースなし)なら
                return sub.asc ? x.length - y.length : y.length - x.length
              } else {
                // 降順(リバースあり)なら
                return sub.asc ? y.length - x.length : x.length - y.length
              }
          }
        })

        break
      default:
        materials.sort((x, y) => {
          if (x[key].length - y[key].length !== 0 || !(sub.keys instanceof Array)) return x[key].length - y[key].length

          sub.keys.forEach(e => {
            x = x[e]
            y = y[e]
          })

          switch (sub.mode) {
            case 'num':
              if (asc) {
                // 昇順(リバースなし)なら
                return sub.asc ? x - y : y - x
              } else {
                // 降順(リバースあり)なら
                return sub.asc ? y - x : x - y
              }

            case 'str':
              if (asc) {
                // 昇順(リバースなし)なら
                return sub.asc ? x.localeCompare(y, 'ja') : y.localeCompare(x, 'ja')
              } else {
                // 降順(リバースあり)なら
                return sub.asc ? y.localeCompare(x, 'ja') : x.localeCompare(y, 'ja')
              }
            default:
              if (asc) {
                // 昇順(リバースなし)なら
                return sub.asc ? x.length - y.length : y.length - x.length
              } else {
                // 降順(リバースあり)なら
                return sub.asc ? y.length - x.length : x.length - y.length
              }
          }
        })

        break
    }

    if (!asc) materials.reverse()

    return materials
  },

  arrayOrderBy(materials, mode = Boolean, asc = Boolean) {
    switch (mode) {
      case 'num':
        materials.sort((x, y) => {
          return x - y
        })
        break
      case 'str':
        materials.sort((x, y) => {
          return x.localeCompare(y, 'ja')
        })

        break
      default:
        materials.sort((x, y) => {
          return x.length - y.length
        })
        break
    }

    if (!asc) materials.reverse()
    return materials
  },

  arrayToString(array, key) {
    let name = ''
    array.forEach(element => {
      name = name + element[key] + ' , '
    })
    name = name.replace(/,\s*$/, '')
    return name
  },

  isPositiveZero(zero) {
    return zero === 0 && new Uint8Array(new Float32Array([zero]).buffer)[3] === 0
  },

  isNegativeZero(zero) {
    return zero === 0 && new Uint8Array(new Float32Array([zero]).buffer)[3] === 128
  },

  nestCopy(materials) {
    return JSON.parse(JSON.stringify(materials))
  },

  selectKeysExtraction(materials, keys, renameKeys) {
    if (renameKeys) {
      return materials.map(material => {
        const newObject = {}
        for (let i = 0; i < keys.length; i++) {
          newObject[renameKeys[i]] = material[keys[i]]
        }
        return newObject
      })
    } else {
      return materials.map(material => {
        const newObject = {}
        for (let i = 0; i < keys.length; i++) {
          newObject[keys[i]] = material[keys[i]]
        }
        return newObject
      })
    }
  },
}

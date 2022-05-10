export const getFullAddress = (level, address) => {
  if (level === 'state') return address.state_short || address.state
  else {
    let fulllAddress = ''
    if (address?.zip_code) {
      fulllAddress += address?.zip_code + ' '
    }
    if (address?.city) {
      fulllAddress += address?.city + ', '
    }
    fulllAddress += address?.state
    return fulllAddress
  }
}

export const groupBy = (array, key) => {
  if (!array) return {}
  return array.reduce((result, obj) => {
    (result[obj[key]] = result[obj[key]] || []).push(obj)
    return result
  }, {})
}

export const parsePrice = (number, isFixed = false) => {
  const fixedNumber = isFixed ? Number.parseFloat(number).toFixed(2) : Number.parseFloat(number) 
  return '$' + String(fixedNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const isServiceProvider = (data) => {
  if (data) {
    if (data.toLowerCase().indexOf('agent/broker') !== -1 || data.toLowerCase().indexOf('lender') !== -1 || data.toLowerCase().indexOf('general contractor') !== -1) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

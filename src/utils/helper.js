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

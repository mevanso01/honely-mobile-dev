import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Image } from 'react-native'
import { icons } from './styleGuide'

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

export const getIconCard = (brand) => {
  const value = brand?.toLowerCase()
  switch (value) {
    case 'visa':
      return (
        <Image source={icons.visa} style={{ width: 41, height: 13, resizeMode: 'contain' }} />
      )
    case 'mastercard':
      return (
        <Image source={icons.mastercard} style={{ width: 37, height: 24, resizeMode: 'contain' }} />
      )
    case 'amex':
      return (
        <Image source={icons.americanExpress} style={{ width: 37, height: 24, resizeMode: 'contain' }} />
      )
    case 'discover':
      return (
        <Image source={icons.discover} style={{ width: 37, height: 24, resizeMode: 'contain' }} />
      )
    case 'jcb':
      return (
        <Image source={icons.jcb} style={{ width: 40, height: 24, resizeMode: 'contain' }} />
      )
    case 'diners-club':
      return (
        <Image source={icons.dinersClub} style={{ width: 38, height: 24, resizeMode: 'contain' }} />
      )
    case 'cup':
      return (
        <Image source={icons.cup} style={{ width: 38, height: 24, resizeMode: 'contain' }} />
      )      
    default:
      return (
        FontAwesome && <FontAwesome
          name='credit-card-alt'
          size={26}
          color={'#000'}
        />
      )
  }
}

export const compareVersion = (currentVersion, newVerion) => {
  currentVersion = currentVersion.split('.')
  newVerion = newVerion.split('.')
  const k = Math.min(currentVersion.length, newVerion.length)
  for (let i = 0; i < k; ++ i) {
      currentVersion[i] = parseInt(currentVersion[i], 10)
      newVerion[i] = parseInt(newVerion[i], 10)
      if (currentVersion[i] > newVerion[i]) return true
      if (currentVersion[i] < newVerion[i]) return false
  }
  return currentVersion.length == newVerion.length ? true: (currentVersion.length < newVerion.length ? false : true)
}

import React, { useState } from 'react'
import { View } from 'react-native'
import { HText, HToast } from '../Shared'
import { Pressable, HStack, Box, useToast } from 'native-base'
import styles from './style'
import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import { doPost, doDelete } from '../../services/http-client'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../store/action/setUser'
import { parsePrice } from '../../utils/helper'

export const CartItem = (props) => {
  const {
    title,
    lead,
    userTypeValue
  } = props

  const toast = useToast()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)

  const totalLeadsIds = [...lead.cart, ...lead.available]
  const maxQuantity = totalLeadsIds.length
  const [cartQty, setCartQty] = useState(lead.cart.length)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateCart = (updatedLead) => {
    const prevCart = currentUser?.cart || {}
    let updatedCart = { ...prevCart }
    if (userTypeValue === 1 && updatedCart?.buyer_leads) {
      updatedCart.buyer_leads = updatedCart?.buyer_leads.map(_lead => {
        if (_lead.zip_code === lead.zip_code) return updatedLead
        return _lead
      })
    }
    if (userTypeValue === 2 && updatedCart.seller_leads) {
      updatedCart.seller_leads = updatedCart?.seller_leads.map(_lead => {
        if (_lead.zip_code === lead.zip_code) return updatedLead
        return _lead
      })
    }
    if (userTypeValue === 3 && updatedCart.prospective_leads) {
      updatedCart.prospective_leads = updatedCart?.prospective_leads.map(_lead => {
        if (_lead.zip_code === lead.zip_code) return updatedLead
        return _lead
      })
    }
    dispatch(setUser({ cart: updatedCart }))
  }

  const handleRemoveLeadCart = () => {
    const prevCart = currentUser?.cart || {}
    let updatedCart = { ...prevCart }
    if (userTypeValue === 1 && updatedCart?.buyer_leads) {
      updatedCart.buyer_leads = updatedCart?.buyer_leads.filter(_lead => _lead.zip_code !== lead.zip_code)
    }
    if (userTypeValue === 2 && updatedCart.seller_leads) {
      updatedCart.seller_leads = updatedCart?.seller_leads.filter(_lead => _lead.zip_code !== lead.zip_code)
    }
    if (userTypeValue === 3 && updatedCart.prospective_leads) {
      updatedCart.prospective_leads = updatedCart?.prospective_leads.filter(_lead => _lead.zip_code !== lead.zip_code)
    }
    dispatch(setUser({ cart: updatedCart }))
  }

  const handleDecrement = () => {
    if (cartQty <= 0) return
    setCartQty(cartQty - 1)
    handleRemoveCart()
  }

  const handleIncrement = () => {
    if (cartQty < maxQuantity) {
      setCartQty(cartQty + 1)
      handleAddToCart()
    }
  }
  const handleAddToCart = async () => {
    try {
      setIsLoading(true)
      let leadAvailable = [...lead.available]
      const newCartId = leadAvailable.shift()
      const response = await doPost(`lookup-test/cart?user-id=${currentUser?.user_id}`, { leads: [newCartId] })
      if (response.result !== 'Success') throw response
      const updatedLead = {
        ...lead,
        cart: [...lead.cart, newCartId],
        available: leadAvailable
      }
      handleUpdateCart(updatedLead)     
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.show({
        render: () => <HToast status='error' message={error.message} />,
        placement: 'top',
        duration: TOAST_LENGTH_SHORT
      })
    }
  }

  const handleRemoveCart = async () => {
    try {
      setIsLoading(true)
      let leadCart = [...lead.cart]
      const removedCartId = leadCart.pop()
      const response = await doDelete(`lookup-test/cart?user-id=${currentUser?.user_id}`, { leads: [removedCartId] })
      if (response.result !== 'Success') throw response
      const updatedLead = {
        ...lead,
        cart: leadCart,
        available: [removedCartId, ...lead.available]
      }
      if (leadCart.length === 0) {
        handleRemoveLeadCart()
      } else {
        handleUpdateCart(updatedLead)
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.show({
        render: () => <HToast status='error' message={error.message} />,
        placement: 'top',
        duration: TOAST_LENGTH_SHORT
      })
    }
  }

  return (
    <Box mb='8'>
      <SpinnerOverlay
        visible={isLoading}
      />
      <Box ml='6'>
        <HText style={styles.textStyle}>{title}</HText>
      </Box>
      <HStack justifyContent='space-between' alignItems='center'>
        <HStack alignItems='center'>
          <Pressable
            _pressed={{ opacity: 0.6 }}
            disabled={cartQty === 0}
            _disabled={{ opacity: 0.6 }}
            onPress={() => handleDecrement()}
          >
            <HText style={styles.qtyBtnText}>-</HText>
          </Pressable>
          <View style={styles.qtyTextContainer}>
            <View style={styles.qtyTextWrapper}>
              <HText style={styles.qtyText}>{cartQty}</HText>
            </View>
          </View>
          <Pressable
            _pressed={{ opacity: 0.6 }}
            disabled={cartQty === maxQuantity}
            _disabled={{ opacity: 0.6 }}
            onPress={() => handleIncrement()}
          >
            <HText style={styles.qtyBtnText}>+</HText>
          </Pressable>
        </HStack>
        <HText style={styles.textStyle}>@</HText>
        <HStack>
          <HText style={styles.textStyle}>{parsePrice(lead.price)}</HText>
          <HText style={styles.upperText}>ea.</HText>
        </HStack>
      </HStack>
    </Box>
  )
}

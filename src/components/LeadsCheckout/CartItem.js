import React, { useState } from 'react'
import { View } from 'react-native'
import { HText } from '../Shared'
import { Pressable, HStack, Box, useToast } from 'native-base'
import styles from './style'
import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import { doPost, doDelete } from '../../services/http-client'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../store/action/setUser'

export const CartItem = (props) => {
  const {
    title,
    leadsGroup,
    userTypeValue
  } = props

  const toast = useToast()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)

  const lead = leadsGroup[0]
  const defaultLeadsIds = leadsGroup.reduce((ids, obj) => [...ids, obj.lead_id], [])
  const maxQuantity = defaultLeadsIds.length
  const [cartQty, setCartQty] = useState(maxQuantity)
  const [leadsIds, setLeadsIds] = useState(defaultLeadsIds)
  const [isLoading, setIsLoading] = useState(false)

  const handleDecrement = () => {
    if (cartQty <= 1) return
    setCartQty(cartQty - 1)
    const updatedLeadsIds = defaultLeadsIds.slice(0, cartQty - 1)
    setLeadsIds(updatedLeadsIds)
    handleRemoveCart(defaultLeadsIds.slice(cartQty - 1, cartQty)[0])
  }

  const handleIncrement = () => {
    if (cartQty < maxQuantity) {
      setCartQty(cartQty + 1)
      const updatedLeadsIds = defaultLeadsIds.slice(0, cartQty + 1)
      setLeadsIds(updatedLeadsIds)
      handleAddToCart(defaultLeadsIds.slice(cartQty, cartQty + 1)[0])
    }
  }

  const handleAddToCart = async (leadId) => {
    try {
      setIsLoading(true)
      const response = await doPost(`lookup-test/cart?user-id=${currentUser?.user_id}`, { leads: [leadId] })
      if (response.result !== 'Success') throw response
      const newCart = {
        lead_id: leadId,
        zip_code: lead.zip_code,
        lead_price: lead.lead_price
      }
      const prevCart = currentUser?.cart || {}
      let updatedCart = { ...prevCart }
      if (userTypeValue === 1) {
        updatedCart.buyer_leads = [...updatedCart?.buyer_leads, newCart]
      }
      if (userTypeValue === 2) {
        updatedCart.seller_leads = [...updatedCart?.seller_leads, newCart]
      }
      if (userTypeValue === 3) {
        updatedCart.prospective_leads = [...updatedCart?.prospective_leads, newCart]
      }
      dispatch(setUser({ cart: updatedCart }))      
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.show({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
    }
  }

  const handleRemoveCart = async (leadId) => {
    try {
      setIsLoading(true)
      const response = await doDelete(`lookup-test/cart?user-id=${currentUser?.user_id}&lead-id=${leadId}`)
      if (response.result !== 'Success') throw response
      const prevCart = currentUser?.cart || {}
      let updatedCart = { ...prevCart }
      if (userTypeValue === 1) {
        updatedCart.buyer_leads = updatedCart?.buyer_leads.filter(_lead => _lead.lead_id !== leadId)
      }
      if (userTypeValue === 2) {
        updatedCart.seller_leads = updatedCart?.seller_leads.filter(_lead => _lead.lead_id !== leadId)
      }
      if (userTypeValue === 3) {
        updatedCart.prospective_leads = updatedCart?.prospective_leads.filter(_lead => _lead.lead_id !== leadId)
      }
      dispatch(setUser({ cart: updatedCart }))
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.show({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
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
            disabled={cartQty === 1}
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
          <HText style={styles.textStyle}>${(lead.lead_price * cartQty).toFixed(2)}</HText>
          <HText style={styles.upperText}>ea.</HText>
        </HStack>
      </HStack>
    </Box>
  )
}

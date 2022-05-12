import React, { useState, useEffect } from 'react'
import { View, Image } from 'react-native'
import { HText, HButton, HToast } from '../Shared'
import { HStack, Divider, Box, VStack, Pressable, useToast, Spinner } from 'native-base'
import styles from './style'
import { colors, icons } from '../../utils/styleGuide'
import { doPost, doDelete } from '../../services/http-client'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../store/action/setUser'
import { parsePrice } from '../../utils/helper'

export const Card = (props) => {
  const {
    userTypeValue,
    leadsGroup,
    zipCode,
    totalCart
  } = props

  const toast = useToast()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)

  const lead = leadsGroup[0]
  const defaultLeadsIds = leadsGroup.reduce((ids, obj) => [...ids, obj.lead_id], [])
  const maxQuantity = defaultLeadsIds.length
  const [isAdded, setIsAdded] = useState(false)
  const [isModify, setIsModify] = useState(false)
  const [cartQty, setCartQty] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [leadsIds, setLeadsIds] = useState(defaultLeadsIds)

  const getUser = (value) => {
    const userTypes = [
      { value: 1, content: 'Buyer', icon: icons.user },
      { value: 2, content: 'Seller', icon: icons.user },
      { value: 3, content: 'Prospective Seller', icon: icons.groupUser },
    ]
    const found = userTypes.find(item => item.value === value)
    return found
  }

  const handleDecrement = () => {
    if (cartQty <= 0) return
    setIsModify(true)
    setCartQty(cartQty - 1)
    setLeadsIds(defaultLeadsIds.slice(0, cartQty - 1))
  }

  const handleIncrement = () => {
    if (cartQty < maxQuantity) {
      setIsModify(true)
      setCartQty(cartQty + 1)
      setLeadsIds(defaultLeadsIds.slice(0, cartQty + 1))
    }
  }

  const handleModifyCart = async () => {
    if (userTypeValue === 1) {
      const buyerLeadCart = (currentUser?.cart?.buyer_leads || []).find(_lead => _lead.zip_code === zipCode)?.cart || []
      if (buyerLeadCart.length > leadsIds.length) {
        let difference = buyerLeadCart.filter(x => !leadsIds.includes(x))
        await handleRemoveCart(difference)
      }
      if (buyerLeadCart.length < leadsIds.length) {
        let difference = leadsIds.filter(x => !buyerLeadCart.includes(x))
        handleAddToCart(difference)
      }
    }
    if (userTypeValue === 2) {
      const sellerLeadCart = (currentUser?.cart?.seller_leads || []).find(_lead => _lead.zip_code === zipCode)?.cart || []
      if (sellerLeadCart.length > leadsIds.length) {
        let difference = sellerLeadCart.filter(x => !leadsIds.includes(x))
        await handleRemoveCart(difference)
      }
      if (sellerLeadCart.length < leadsIds.length) {
        let difference = leadsIds.filter(x => !sellerLeadCart.includes(x))
        handleAddToCart(difference)
      }
    }
    if (userTypeValue === 3) {
      const prospectiveLeadCart = (currentUser?.cart?.prospective_leads || []).find(_lead => _lead.zip_code === zipCode)?.cart || []
      if (prospectiveLeadCart.length > leadsIds.length) {
        let difference = prospectiveLeadCart.filter(x => !leadsIds.includes(x))
        await handleRemoveCart(difference)
      }
      if (prospectiveLeadCart.length < leadsIds.length) {
        let difference = leadsIds.filter(x => !prospectiveLeadCart.includes(x))
        await handleAddToCart(difference)
      }
    }

    setIsModify(false)
  }

  const handleAddToCart = async (leadsIds) => {
    try {
      setIsLoading(true)
      const response = await doPost(`lookup-test/cart?user-id=${currentUser?.user_id}`, { leads: leadsIds })
      if (response.result !== 'Success') throw response
      setIsAdded(true)
      const newCart = {
        zip_code: lead.zip_code,
        price: lead.lead_price,
        cart: leadsIds,
        available: []
      }
      const prevCart = currentUser?.cart || {}
      let updatedCart = { ...prevCart }
      const totalBuyers = currentUser?.cart?.buyer_leads || []
      const totalSellers = currentUser?.cart?.seller_leads || []
      const totalProspective = currentUser?.cart?.prospective_leads || []
      if (userTypeValue === 1) {
        updatedCart.buyer_leads = [...totalBuyers, newCart]
      }
      if (userTypeValue === 2) {
        updatedCart.seller_leads = [...totalSellers, newCart]
      }
      if (userTypeValue === 3) {
        updatedCart.prospective_leads = [...totalProspective, newCart]
      }

      dispatch(setUser({ cart: updatedCart }))      
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

  const handleRemoveCart = async (leadsIds) => {
    try {
      setIsLoading(true)
      const response = await doDelete(`lookup-test/cart?user-id=${currentUser?.user_id}`, { leads: leadsIds })
      if (response.result !== 'Success') throw response
      setIsAdded(false)
      const prevCart = currentUser?.cart || {}
      let updatedCart = { ...prevCart }
      if (userTypeValue === 1) {
        updatedCart.buyer_leads = updatedCart?.buyer_leads.filter(_lead => {
          _lead.cart = _lead.cart.filter(id => !leadsIds.includes(id))
          if (_lead.cart.length) return true
          return false
        })
      }
      if (userTypeValue === 2) {
        updatedCart.seller_leads = updatedCart?.seller_leads.filter(_lead => {
          _lead.cart = _lead.cart.filter(id => !leadsIds.includes(id))
          if (_lead.cart.length) return true
          return false
        })
      }
      if (userTypeValue === 3) {
        updatedCart.prospective_leads = updatedCart?.prospective_leads.filter(_lead => {
          _lead.cart = _lead.cart.filter(id => !leadsIds.includes(id))
          if (_lead.cart.length) return true
          return false
        })
      }
      dispatch(setUser({ cart: updatedCart }))
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

  useEffect(() => {
    if (isModify || isLoading) return
    let _cart = 0
    defaultLeadsIds.forEach(id => {
      const found = totalCart.find(_lead => _lead.cart.includes(id))
      if (found) _cart += 1
    })
    setCartQty(_cart)
    if (_cart) setIsAdded(true)
    else setIsAdded(false)
  }, [totalCart, defaultLeadsIds, isModify, isLoading])

  return (
    <View style={styles.cardContainer}>
      <HStack justifyContent='space-between' alignItems='center'>
        <HStack alignItems='center'>
          <Image source={getUser(userTypeValue)?.icon} style={styles.userIcon} />
          <HText style={styles.cardBigText}>{getUser(userTypeValue)?.content}</HText>
        </HStack>
        <HText style={styles.cardBigText}>{parsePrice(lead?.lead_price)}</HText>
      </HStack>
      <Divider backgroundColor={colors.white} my='4' />
      <HText style={styles.priceDescription}>
        Average Home Price in Zip Code: {zipCode}
      </HText>
      <Box mt='3' mb='2'>
        <HText style={styles.homePriceText}>{parsePrice(lead?.average_home_price)}</HText>
      </Box>
      <HStack justifyContent='flex-end'>
        <VStack height='10' alignItems='center'>
          {(isAdded && !isModify) ? (
            <VStack alignItems='flex-end'>
              {isLoading ? (
                <HStack alignItems='center'>
                  <HText style={styles.addedText}>Submitting</HText>
                  <Spinner color={colors.primary} size='lg' ml='2' />
                </HStack>
              ) : (
                <>
                  <HStack alignItems='center'>
                    <HText style={styles.addedText}>
                      {maxQuantity > 1 && `${cartQty}x `} Added
                    </HText>
                    <Image source={icons.check} style={styles.checkIcon} />
                  </HStack>
                  <Pressable
                    _pressed={{
                      opacity: 0.6
                    }}
                    onPress={() => {
                      maxQuantity > 1 ? setIsModify(true) : handleRemoveCart([lead.lead_id])
                    }}
                  >
                    <HText style={styles.modifyText}>
                      {maxQuantity > 1 ? 'Modify Cart' : 'Remove from Cart'}
                    </HText>
                  </Pressable>
                </>
              )}
            </VStack>
          ) : (
            <HStack>
              {maxQuantity > 1 && (
                <HStack mr='3' alignItems='center'>
                  <HText style={styles.cartQtyLabel}>Qty.</HText>
                  <HStack justifyContent='center'>
                    <Pressable
                      _pressed={{
                        opacity: 0.6
                      }}
                      disabled={cartQty === 0}
                      _disabled={{ opacity: 0.6 }}
                      onPress={() => handleDecrement()}
                    >
                      <View style={styles.minusBtn}>
                        <HText style={styles.cartQtyBtnText}>-</HText>
                      </View>
                    </Pressable>
                    <View style={styles.qtyTextContainer}>
                      <HText style={styles.qtyText}>{cartQty}</HText>
                    </View>
                    <Pressable
                      _pressed={{
                        opacity: 0.6
                      }}
                      disabled={cartQty === maxQuantity}
                      _disabled={{ opacity: 0.6 }}
                      onPress={() => handleIncrement()}
                    >
                      <View style={styles.plusBtn}>
                        <HText style={styles.cartQtyBtnText}>+</HText>
                      </View>
                    </Pressable>
                  </HStack>
                </HStack>
              )}
              <HButton
                text={(isAdded && maxQuantity > 1) ? 'Update cart' : 'Add to Cart'}
                width={156}
                height={36}
                backgroundColor={colors.white}
                borderColor={colors.white}
                textStyle={{
                  color: colors.primary,
                  fontSize: 16
                }}
                isLoading={isLoading}
                isDisabled={!cartQty && !isAdded && maxQuantity > 1}
                disabledOpacity={0.6}
                onPress={() => maxQuantity > 1 ? handleModifyCart() : handleAddToCart(leadsIds)}
              />
            </HStack>
          )}
        </VStack>
      </HStack>
    </View>
  )
}

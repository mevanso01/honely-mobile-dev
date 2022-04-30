import React, { useState } from 'react'
import { View, Image } from 'react-native'
import { HText, HButton } from '../Shared'
import { HStack, Divider, Box, VStack, Pressable, useToast, Spinner } from 'native-base'
import styles from './style'
import { colors, icons } from '../../utils/styleGuide'
import { doPost, doDelete } from '../../services/http-client'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../store/action/setUser'

export const Card = (props) => {
  const {
    userTypeValue,
    lead
  } = props

  const toast = useToast()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)

  const [isAdded, setIsAdded] = useState()
  const [cartQty, setCartQty] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

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
    if (cartQty <= 1) return
    setCartQty(cartQty - 1)
  }

  const handleIncrement = () => {
    setCartQty(cartQty + 1)
  }

  const handleAddToCart = async () => {
    try {
      setIsLoading(true)
      const response = await doPost(`lookup-test/cart?user-id=${currentUser?.user_id}`, { leads: [lead.lead_id] })
      if (response.result !== 'Success') throw response
      setIsAdded(true)
      const newCart = {
        lead_id: lead.lead_id,
        zip_code: lead.zip_code,
        lead_price: lead.average_home_price
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

  const handleRemoveCart = async () => {
    try {
      setIsLoading(true)
      const response = await doDelete(`lookup-test/cart?user-id=${currentUser?.user_id}&lead-id=${lead.lead_id}`)
      if (response.result !== 'Success') throw response
      setIsAdded(false)
      const prevCart = currentUser?.cart || {}
      let updatedCart = { ...prevCart }
      if (userTypeValue === 1) {
        updatedCart.buyer_leads = updatedCart?.buyer_leads.filter(_lead => _lead.lead_id !== lead.lead_id)
      }
      if (userTypeValue === 2) {
        updatedCart.seller_leads = updatedCart?.seller_leads.filter(_lead => _lead.lead_id !== lead.lead_id)
      }
      if (userTypeValue === 3) {
        updatedCart.prospective_leads = updatedCart?.prospective_leads.filter(_lead => _lead.lead_id !== lead.lead_id)
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
    <View style={styles.cardContainer}>
      <HStack justifyContent='space-between' alignItems='center'>
        <HStack alignItems='center'>
          <Image source={getUser(userTypeValue)?.icon} style={styles.userIcon} />
          <HText style={styles.cardBigText}>{getUser(userTypeValue)?.content}</HText>
        </HStack>
        <HText style={styles.cardBigText}>${lead?.lead_price}</HText>
      </HStack>
      <Divider backgroundColor={colors.white} my='4' />
      <HText style={styles.priceDescription}>
        Average Home Price in Zip Code: {lead.zip_code}
      </HText>
      <Box mt='3' mb='2'>
        <HText style={styles.cardBigText}>${lead?.average_home_price}</HText>
      </Box>
      <HStack justifyContent='flex-end'>
        <VStack height='10' alignItems='center'>
          {isAdded ? (
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
                      {userTypeValue === 3 && `${cartQty}x `} Added
                    </HText>
                    <Image source={icons.check} style={styles.checkIcon} />
                  </HStack>
                  <Pressable
                    _pressed={{
                      opacity: 0.6
                    }}
                    onPress={() => handleRemoveCart()}
                  >
                    <HText style={styles.modifyText}>
                      {userTypeValue === 3 ? 'Modify Cart' : 'Remove from Cart'}
                    </HText>
                  </Pressable>
                </>
              )}
            </VStack>
          ) : (
            <HStack>
              {userTypeValue === 3 && (
                <HStack mr='3' alignItems='center'>
                  <HText style={styles.cartQtyLabel}>Qty.</HText>
                  <HStack justifyContent='center'>
                    <Pressable
                      _pressed={{
                        opacity: 0.6
                      }}
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
                text='Add to Cart'
                width={156}
                height={36}
                backgroundColor={colors.white}
                borderColor={colors.white}
                textStyle={{
                  color: colors.primary,
                  fontSize: 16
                }}
                isLoading={isLoading}
                onPress={() => handleAddToCart()}
              />
            </HStack>
          )}
        </VStack>
      </HStack>
    </View>
  )
}

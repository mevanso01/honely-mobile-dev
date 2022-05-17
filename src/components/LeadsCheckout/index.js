import React, { useState, useEffect } from 'react'
import { View, Image, ScrollView } from 'react-native'
import { HText, HButton, HToast } from '../Shared'
import { Pressable, HStack, Box, useToast, Divider, VStack } from 'native-base'
import { colors, icons } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'
import styles from './style'
import { CartItem } from './CartItem'
import { useSelector, useDispatch } from 'react-redux'
import { doGet } from '../../services/http-client'
import { setUser } from '../../store/action/setUser'
import SpinnerOverlay from 'react-native-loading-spinner-overlay'
import { parsePrice } from '../../utils/helper'
import { TOAST_LENGTH_SHORT } from '../../config'

export const LeadsCheckout = (props) => {
  const {
    navigation,
    onNavigationRedirect
  } = props

  const toast = useToast()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const [isLoading, setIsLoading] = useState(true)

  const [buyersLeads, setBuyersLeads] = useState([])
  const [sellersLeads, setSellersLeads] = useState([])
  const [prospectiveLeads, setProspectiveLeads] = useState([])
  const [totalLeadCount, setTotalLeadCount] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    if (isLoading) return
    const totalBuyers = currentUser?.cart?.buyer_leads || []
    const totalSellers = currentUser?.cart?.seller_leads || []
    const totalProspective = currentUser?.cart?.prospective_leads || []

    setBuyersLeads(totalBuyers)
    setSellersLeads(totalSellers)
    setProspectiveLeads(totalProspective)

    const _total = [...totalBuyers, ...totalSellers, ...totalProspective]
    const _totalLeadCount = _total.reduce((count, obj) => count + obj.cart.length, 0)
    setTotalLeadCount(_totalLeadCount)
    const _totalPrice = _total.reduce((price, obj) => price + obj.price * obj.cart.length, 0)
    setTotalPrice(_totalPrice)
  }, [JSON.stringify(currentUser?.cart), isLoading])

  const handleGetUserCart = async () => {
    try {
      setIsLoading(true)
      const response = await doGet('lookup-test/cart', { 'user-id': currentUser?.user_id })
      if (response.result !== 'Success') throw response
      dispatch(setUser({ cart: response.data }))
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
    handleGetUserCart()
  }, [])

  return (
    <View style={styles.screenContainer}>
      <SpinnerOverlay
        visible={isLoading}
      />
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => navigation.goBack()}
          _pressed={{ opacity: 0.7 }}
        >
          <HStack alignItems='center'>
            <Image source={icons.arrowLeft} style={styles.backIcon} />
            <HText style={styles.backText}>Back</HText>
          </HStack>
        </Pressable>
      </View>
      <HText style={styles.headerTitle}>
        {totalLeadCount ? 'Place your order' : 'Your cart is empty'}
      </HText>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {totalLeadCount ? (
          <>
            {buyersLeads.map(lead => (
              <CartItem
                key={lead.zip_code}
                title={`Buyers (${lead.zip_code})`}
                lead={lead}
                userTypeValue={1}
              />
            ))}
            {sellersLeads.map(lead => (
              <CartItem
                key={lead.zip_code}
                title={`Sellers (${lead.zip_code})`}
                lead={lead}
                userTypeValue={2}
              />
            ))}
            {prospectiveLeads.map(lead => (
              <CartItem
                key={lead.zip_code}
                title={`Prospective (${lead.zip_code})`}
                lead={lead}
                userTypeValue={3}
              />
            ))}
          </>
        ) : (
          <VStack alignItems='center' justifyContent='center' flex='1' opacity='0.5'>
            <Image source={icons.cart} style={styles.emptyCartImage}  />
          </VStack>
        )}
      </ScrollView>
      {totalLeadCount ? (
        <>
          <Divider backgroundColor={colors.primary} my='4' />
          <Box mb='3' alignItems='center'>
            <HText style={styles.textStyle}>Total leads ({totalLeadCount}):</HText>
          </Box>
          <Box alignItems='center'>
            <HText style={styles.textStyle}>{parsePrice(totalPrice, true)}</HText>
          </Box>
        </>
      ) : (
        <Box mt='4' mb='2' alignItems='center'>
          <HText style={styles.textStyle}>Use the search page to find leads.</HText>
        </Box>
      )}
      <Box alignItems='center' mt='6' mb='4'>
        <HButton
          text={totalLeadCount ? 'Place Order' : 'Find Leads'}
          backgroundColor={colors.darkPrimary}
          width={(deviceWidth - 36) * 0.9}
          height={61}
          textStyle={{
            fontSize: 24
          }}
          onPress={() => totalLeadCount
            ? onNavigationRedirect('BillingInfo', { totalPrice: totalPrice })
            : onNavigationRedirect('FindLeads')
          }
        />
      </Box>
    </View>
  )
}

import React, { useState, useEffect } from 'react'
import { View, Image, ScrollView } from 'react-native'
import { HText, HButton } from '../Shared'
import { Pressable, HStack, Box, useToast } from 'native-base'
import { colors, icons } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'
import styles from './style'
import { CartItem } from './CartItem'
import { useSelector, useDispatch } from 'react-redux'
import { doGet } from '../../services/http-client'
import { setUser } from '../../store/action/setUser'
import SpinnerOverlay from 'react-native-loading-spinner-overlay';

export const LeadsCheckout = (props) => {
  const {
    navigation
  } = props

  const toast = useToast()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const [isLoading, setIsLoading] = useState(true)

  const [buyersLeads, setBuyersLeads] = useState([])
  const [sellersLeads, setSellersLeads] = useState([])
  const [prospectiveLeads, setProspectiveLeads] = useState([])
  const [totalCart, setTotalCart] = useState([])
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
    setTotalCart(_total)
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
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
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
      <HText style={styles.headerTitle}>Place your order</HText>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
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
        <Box mb='10' mt='8' alignItems='center'>
          <HText style={styles.textStyle}>{totalLeadCount} total leads</HText>
        </Box>
        <Box alignItems='center' mb='10'>
          <HText style={styles.textStyle}>Total: ${totalPrice.toFixed(2)}</HText>
        </Box>
      </ScrollView>
      <Box alignItems='center' mt='4' mb='4'>
        <HButton
          text='Place Order'
          backgroundColor={colors.darkPrimary}
          width={(deviceWidth - 36) * 0.9}
          height={61}
          textStyle={{
            fontSize: 24
          }}
        />
      </Box>
    </View>
  )
}

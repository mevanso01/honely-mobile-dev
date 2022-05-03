import React, { useState, useEffect } from 'react'
import { View, Image, ScrollView } from 'react-native'
import { HText, HButton } from '../Shared'
import { Pressable, HStack, Box } from 'native-base'
import { colors, icons } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'
import styles from './style'
import { CartItem } from './CartItem'
import { useSelector } from 'react-redux'
import { groupBy } from '../../utils/helper'

export const LeadsCheckout = (props) => {
  const {
    navigation
  } = props

  const currentUser = useSelector(state => state.currentUser)

  const [buyersLeads, setBuyersLeads] = useState({})
  const [sellersLeads, setSellersLeads] = useState({})
  const [prospectiveLeads, setProspectiveLeads] = useState({})
  const [totalCart, setTotalCart] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const totalBuyers = currentUser?.cart?.buyer_leads || []
    const totalSellers = currentUser?.cart?.seller_leads || []
    const totalProspective = currentUser?.cart?.prospective_leads || []
  
    setBuyersLeads(groupBy(totalBuyers, 'zip_code'))
    setSellersLeads(groupBy(totalSellers, 'zip_code'))
    setProspectiveLeads(groupBy(totalProspective, 'zip_code'))

    let _total = [...totalBuyers, ...totalSellers, ...totalProspective]
    setTotalCart(_total)
    const _totalPrice = _total.reduce((price, obj) => price + obj.lead_price, 0)
    setTotalPrice(_totalPrice)
  }, [JSON.stringify(currentUser?.cart)])

  return (
    <View style={styles.screenContainer}>
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
        {Object.keys(buyersLeads).map(key => (
          <CartItem
            key={key}
            title={`Buyers (${key})`}
            leadsGroup={buyersLeads[key]}
            userTypeValue={1}
          />
        ))}
        {Object.keys(sellersLeads).map(key => (
          <CartItem
            key={key}
            title={`Sellers (${key})`}
            leadsGroup={sellersLeads[key]}
            userTypeValue={2}
          />
        ))}
        {Object.keys(prospectiveLeads).map(key => (
          <CartItem
            key={key}
            title={`Prospective (${key})`}
            leadsGroup={prospectiveLeads[key]}
            userTypeValue={3}
          />
        ))}
        <Box mb='10' mt='8' alignItems='center'>
          <HText style={styles.textStyle}>{totalCart.length} total leads</HText>
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

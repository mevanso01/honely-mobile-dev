import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, Platform } from 'react-native'
import { Pressable } from 'native-base'
import { icons, colors, fonts } from '../../utils/styleGuide'
import { useSelector } from 'react-redux'
import HText from './HText'

const HCartButton = (props) => {
  const {
    onPress
  } = props

  const styles = StyleSheet.create({
    cartContainer: {
      position: 'relative',
      width: 30
    },
    cartIcon: {
      width: 25,
      height: 25,
      resizeMode: 'contain',
      tintColor: colors.primary
    },
    cartQtyWrapper: {
      position: 'absolute',
      top: -11,
      right: 0,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: 21,
      height: 21
    },
    cartQty: {
      fontSize: 10,
      color: colors.primary,
      fontFamily: fonts.bold,
      marginTop: Platform.OS === 'ios' ? 2 : 0
    },
  })

  const currentUser = useSelector(state => state.currentUser)
  const [totalCartCount, setTotalCartCount] = useState([])

  useEffect(() => {
    if (!currentUser?.cart) return
    const totalBuyers = currentUser?.cart?.buyer_leads || []
    const totalSellers = currentUser?.cart?.seller_leads || []
    const totalProspective = currentUser?.cart?.prospective_leads || []
    let _total = [...totalBuyers, ...totalSellers, ...totalProspective]
    const _totalLeadCount = _total.reduce((count, obj) => count + obj.cart.length, 0)
    setTotalCartCount(_totalLeadCount)
  }, [JSON.stringify(currentUser?.cart)])

  return (
    <Pressable
      _pressed={{
        opacity: 0.6
      }}
      onPress={onPress}
    >
      <View style={styles.cartContainer}>
        <Image source={icons.cart} style={[styles.cartIcon, props.iconStyle]} />
        <View style={[styles.cartQtyWrapper, props.countWrapperStyle]}>
          <HText style={[styles.cartQty, props.countTextStyle]}>{totalCartCount}</HText>
        </View>
      </View>
    </Pressable>
  )
}

export default HCartButton

import React, { useState } from 'react'
import { View } from 'react-native'
import { HText } from '../Shared'
import { Pressable, HStack, Box } from 'native-base'
import styles from './style'

export const CartItem = (props) => {
  const {
    title,
    defaultQty
  } = props

  const [cartQty, setCartQty] = useState(defaultQty)

  const handleDecrement = () => {
    if (cartQty <= 1) return
    setCartQty(cartQty - 1)
  }

  const handleIncrement = () => {
    setCartQty(cartQty + 1)
  }

  return (
    <Box mb='8'>
      <Box ml='6'>
        <HText style={styles.textStyle}>{title}</HText>
      </Box>
      <HStack justifyContent='space-between' alignItems='center'>
        <HStack alignItems='center'>
          <Pressable
            _pressed={{
              opacity: 0.6
            }}
            onPress={() => handleDecrement()}
          >
            <HText style={styles.qtyBtnText}>-</HText>
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
            <HText style={styles.qtyBtnText}>+</HText>
          </Pressable>
        </HStack>
        <HText style={styles.textStyle}>@</HText>
        <HStack>
          <HText style={styles.textStyle}>${(50 * cartQty).toFixed(2)}</HText>
          <HText style={styles.upperText}>ea.</HText>
        </HStack>
      </HStack>
    </Box>
  )
}

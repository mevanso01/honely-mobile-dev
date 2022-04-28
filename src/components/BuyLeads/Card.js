import React, { useState } from 'react'
import { View, Image } from 'react-native'
import { HText, HButton } from '../Shared'
import { HStack, Divider, Box, VStack, Pressable } from 'native-base'
import styles from './style'
import { colors, icons } from '../../utils/styleGuide'

export const Card = (props) => {
  const {
    userTypeValue,
    lead
  } = props
  const [isAdded, setIsAdded] = useState()
  const [cartQty, setCartQty] = useState(1)

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
        Average Home Price in Zip Code: 90210
      </HText>
      <Box mt='3' mb='2'>
        <HText style={styles.cardBigText}>${lead?.average_home_price}</HText>
      </Box>
      <HStack justifyContent='flex-end'>
        <VStack height='10' alignItems='center'>
          {isAdded ? (
            <VStack alignItems='flex-end'>
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
                onPress={() => setIsAdded(false)}
              >
                <HText style={styles.modifyText}>
                  {userTypeValue === 3 ? 'Modify Cart' : 'Remove from Cart'}
                </HText>
              </Pressable>
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
                onPress={() => setIsAdded(true)}
              />
            </HStack>
          )}
        </VStack>
      </HStack>
    </View>
  )
}

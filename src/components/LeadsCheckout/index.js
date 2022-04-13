import React from 'react'
import { View, Image, ScrollView } from 'react-native'
import { HText, HButton } from '../Shared'
import { Pressable, HStack, Box } from 'native-base'
import { colors, icons } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'
import styles from './style'
import { CartItem } from './CartItem'

export const LeadsCheckout = (props) => {
  const {
    navigation
  } = props

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
        <CartItem
          title='Buyers (92131)'
          defaultQty={1}
        />
        <CartItem
          title='Sellers  (90023)'
          defaultQty={2}
        />
        <CartItem
          title='Prospective Sellers'
          defaultQty={10}
        />
        <Box mb='10' mt='8' alignItems='center'>
          <HText style={styles.textStyle}>80 total leads</HText>
        </Box>
        <Box alignItems='center' mb='10'>
          <HText style={styles.textStyle}>Total: $2,350.00</HText>
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

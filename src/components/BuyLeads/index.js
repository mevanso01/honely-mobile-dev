import React from 'react'
import { View, Image, Vibration, ScrollView } from 'react-native'
import { Pressable, HStack, VStack, Box, Checkbox, Icon, Divider } from 'native-base'
import { HButton, HText } from '../Shared'
import { colors, icons } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'
import styles from './style'
import { Card } from './Card'

export const BuyLeads = (props) => {
  const {
    navigation
  } = props
  
  const onSelectFilterBy = () => {
    Vibration.vibrate(150)
  }

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
      <View style={styles.titleContainer}>
        <HText style={styles.headerTitle}>Buy leads</HText>
        <View style={styles.cartIconContainer}>
          <Image source={icons.cart} style={styles.cartIcon} />
          <View style={styles.cartQtyWrapper}>
            <HText style={styles.cartQty}>12</HText>
          </View>
        </View>
      </View>

      <View style={styles.innerContainer}>
        <HStack mb='4' alignItems='center'>
          <Image source={icons.location} style={styles.addressIcon} />
          <HText style={styles.addressText}>Miami, FL</HText>
        </HStack>
        <VStack mb='4'>
          <HStack mb='4' justifyContent='space-between'>
            <HText style={styles.filterText}>Filter by:</HText>
            <HText style={styles.filterText}>32 leads</HText>
          </HStack>
          <HStack justifyContent='center'>
            <Checkbox
              size='md'
              mr='8'
              borderRadius={15}
              borderColor={colors.primary}
              _checked={{
                backgroundColor: colors.white,
                borderColor: colors.primary,
              }}
              _interactionBox={{
                opacity: 0
              }}
              icon={
                <Icon as={<Image source={icons.cirlceCheckOn} />} />
              }
              onChange={selected => onSelectFilterBy(selected)}
            >
              <HText style={styles.radioLabel}>Buyers</HText>
            </Checkbox>
            <Checkbox
              size='md'
              mr='8'
              borderRadius={15}
              borderColor={colors.primary}
              _checked={{
                backgroundColor: colors.white,
                borderColor: colors.primary,
              }}
              _interactionBox={{
                opacity: 0
              }}
              icon={
                <Icon as={<Image source={icons.cirlceCheckOn} />} />
              }
              onChange={selected => onSelectFilterBy(selected)}
            >
              <HText style={styles.radioLabel}>Sellers</HText>
            </Checkbox>
            <Checkbox
              size='md'
              borderRadius={15}
              borderColor={colors.primary}
              _checked={{
                backgroundColor: colors.white,
                borderColor: colors.primary,
              }}
              _interactionBox={{
                opacity: 0
              }}
              icon={
                <Icon as={<Image source={icons.cirlceCheckOn} />} />
              }
              onChange={selected => onSelectFilterBy(selected)}
            >
              <HText style={styles.radioLabel}>Prospective</HText>
            </Checkbox>
          </HStack>
        </VStack>
      </View>
      <Divider backgroundColor={colors.primary} opacity={0.7} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.innerContainer}>
          <Card userTypeValue={1} />
          <Card userTypeValue={2} />
          <Card userTypeValue={3} />
        </View>
      </ScrollView>
      <Divider backgroundColor={colors.primary} opacity={0.7} />
      <Box alignItems='center' mt='4' mb='8'>
        <HButton
          text='(3) Proceed to Checkout'
          width={deviceWidth - 48}
          borderColor={colors.primary}
          backgroundColor={colors.white}
          borderWidth={1}
          textStyle={{
            color: colors.primary
          }}
        />
      </Box>
    </View>
  )
}

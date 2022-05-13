import React, { useState } from 'react'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import { StyleSheet, Image, View } from 'react-native'
import { Checkbox, VStack, Icon, Divider, Popover, Pressable, HStack } from 'native-base'
import HText from './HText'
import { colors, icons, fonts } from '../../utils/styleGuide'

const HUserFilterBy = (props) => {
  const {
    headerTitle,
    isBuyers,
    isSellers,
    isProspective,
    setIsBuyers,
    setIsSellers,
    setIsProspective,
    handleCustomChange
  } = props

  const [isOpen, setIsOpen] = useState(false)

  const styles = StyleSheet.create({
    radioLabel: {
      color: colors.primary,
      fontSize: 14,
      marginLeft: 6
    },
    title: {
      fontSize: 13,
      color: colors.primary,
      fontFamily: fonts.bold
    },
    filterContainer: {
      backgroundColor: colors.white,
      width: 142,
      borderRadius: 8,
    },
    filterWrapper: {
      shadowColor: colors.text02,
      backgroundColor: colors.text02,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.17,
      shadowRadius: 8,
      elevation: 3,
      borderRadius: 8,
    },
    arrowDownIcon: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
      tintColor: colors.primary,
      marginLeft: 8,
      marginBottom: 1
    }
  })

  const onSelectFilterBy = (selected, type) => {
    handleCustomChange && handleCustomChange(selected, type)
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: true
    }
    ReactNativeHapticFeedback.trigger('impactLight', options)
    switch (type) {
      case 'buyers':
        setIsBuyers(selected)
        break
      case 'sellers':
        setIsSellers(selected)
        break
      case 'prospective':
        setIsProspective(selected)
        break
    }
  }

  return (
    <Popover
      trigger={triggerProps => {
        return (
          <Pressable
            {...triggerProps}
            onPress={() => setIsOpen(true)}
          >
            <HStack alignItems='center'>
              <HText style={styles.title}>{headerTitle}</HText>
              <Image source={icons.arrowDown} style={styles.arrowDownIcon} />
            </HStack>
          </Pressable>
        )
      }}
      placement='bottom right'
      isOpen={isOpen}
      onClose={() => setIsOpen(!isOpen)}
    >
      <Popover.Content
        style={{
          marginTop: -35,
          borderWidth: 0,
          padding: 4,
          marginRight: -4,
        }}
      >
        <View style={styles.filterContainer}>
          <View style={styles.filterWrapper}>
            <VStack py='2' px='2' backgroundColor={colors.white} borderRadius='8'>
              <Pressable onPress={() => setIsOpen(false)}>
                <HStack pt='2' pb='1' justifyContent='flex-end' alignItems='center'>
                  <HText style={styles.title}>{headerTitle}</HText>
                  <Image source={icons.arrowDown} style={[styles.arrowDownIcon, { transform: [{ rotate: '180deg' }]}]} />
                </HStack>
              </Pressable>
              <Divider backgroundColor={colors.lightPrimary} my='2' opacity={0.6} />
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
                _disabled={{ opacity: 1 }}
                isDisabled={!isSellers && !isProspective}
                isChecked={isBuyers}
                onChange={selected => onSelectFilterBy(selected, 'buyers')}
              >
                <HText style={styles.radioLabel}>Buyers</HText>
              </Checkbox>
              <Divider backgroundColor={colors.lightPrimary} my='2' opacity={0.6} />
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
                _disabled={{ opacity: 1 }}
                isDisabled={!isBuyers && !isProspective}
                isChecked={isSellers}
                onChange={selected => onSelectFilterBy(selected, 'sellers')}
              >
                <HText style={styles.radioLabel}>Sellers</HText>
              </Checkbox>
              <Divider backgroundColor={colors.lightPrimary} my='2' opacity={0.6} />
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
                _disabled={{ opacity: 1 }}
                isDisabled={!isSellers && !isBuyers}
                isChecked={isProspective}
                onChange={selected => onSelectFilterBy(selected, 'prospective')}
              >
                <HText style={styles.radioLabel}>Prospective</HText>
              </Checkbox>
              <Divider backgroundColor={colors.lightPrimary} my='2' opacity={0.6} />
            </VStack>
          </View>
        </View>
      </Popover.Content>
    </Popover>
  )
}

export default HUserFilterBy

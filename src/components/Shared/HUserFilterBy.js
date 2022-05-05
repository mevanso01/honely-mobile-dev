import React from 'react'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import { StyleSheet, Image } from 'react-native'
import { Checkbox, VStack, Icon, Divider } from 'native-base'
import HText from './HText'
import { colors, icons } from '../../utils/styleGuide'

const HUserFilterBy = (props) => {
  const {
    isBuyers,
    isSellers,
    isProspective,
    setIsBuyers,
    setIsSellers,
    setIsProspective,
    handleCustomChange
  } = props

  const styles = StyleSheet.create({
    radioLabel: {
      color: colors.primary,
      fontSize: 14,
      marginLeft: 6
    },
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
    <VStack py='2' px='2' backgroundColor={colors.white} borderRadius='2'>
      <Divider backgroundColor={colors.primary} my='2' />
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
        isDisabled={!isSellers && !isProspective}
        isChecked={isBuyers}
        onChange={selected => onSelectFilterBy(selected, 'buyers')}
      >
        <HText style={styles.radioLabel}>Buyers</HText>
      </Checkbox>
      <Divider backgroundColor={colors.primary} my='2' />
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
        isDisabled={!isBuyers && !isProspective}
        isChecked={isSellers}
        onChange={selected => onSelectFilterBy(selected, 'sellers')}
      >
        <HText style={styles.radioLabel}>Sellers</HText>
      </Checkbox>
      <Divider backgroundColor={colors.primary} my='2' />
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
        isDisabled={!isSellers && !isBuyers}
        isChecked={isProspective}
        onChange={selected => onSelectFilterBy(selected, 'prospective')}
      >
        <HText style={styles.radioLabel}>Prospective</HText>
      </Checkbox>
      <Divider backgroundColor={colors.primary} my='2' />
    </VStack>
  )
}

export default HUserFilterBy

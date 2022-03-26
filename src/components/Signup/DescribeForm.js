import React, { useState } from 'react'
import { View } from 'react-native'
import { HText, HButton, HCricleProgress } from '../Shared'
import { Box, HStack } from 'native-base'
import { colors } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'
import styles from './style'

export const DescribeForm = (props) => {
  const {
    formState,
    setFormState,
    handleNextStep
  } = props

  const descibeTypes = [
    {
      value: 'Homeowner',
      text: 'Consumer'
    },
    {
      value: 'Service Provider',
      text: 'Business'
    }
  ]

  return (
    <View style={{ flex: 1 }}>
      <Box alignItems='center' mb='6'>
        <HText style={styles.subtitle}>Before Proceeding</HText>
        <HText style={styles.description}>How would you describe yourself</HText>
      </Box>
      {descibeTypes.map(type => (
        <Box key={type.value} mb='2'>
          <HButton
            text={type.text}
            variant='outline'
            borderColor={formState?.userType === type.value ? colors.primary : colors.borderColor}
            backgroundColor={colors.white}
            textStyle={{ color: formState?.userType === type.value ? colors.text01 : colors.text03 }}
            borderRadius={8}
            shadow='0'
            width={deviceWidth - 36}
            size={20}
            onPress={() => setFormState({ ...formState, userType: type.value })}
          />
        </Box>
      ))}

      <View style={styles.stepButtonContainer}>
        <HStack mb='6' alignItems='center'>
          <HCricleProgress
            isShowChecked={!!formState?.userType}
            fill={formState?.userType === 'consumer' ? 50 : 33}
          />
          <HText style={styles.stepTitle}>Step 1/{formState?.userType === 'consumer' ? 2 : 3}</HText>
        </HStack>

        <Box alignItems='center'>
          <HButton
            text='Next'
            backgroundColor={formState?.userType ? colors.primary : colors.text03}
            shadow='0'
            isDisabled={!formState?.userType}
            onPress={() => handleNextStep(formState?.userType)}
          />
        </Box>
      </View>
    </View>
  )
}

import React from 'react'
import { View, ScrollView } from 'react-native'
import { HText, HButton, HCricleProgress } from '../Shared'
import { Box, HStack } from 'native-base'
import { colors } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'
import styles from './style'

import { useDispatch, useSelector } from 'react-redux'
import { setFormState } from './store'

export const BusinessTypeForm = (props) => {
  const {
    handleNextStep
  } = props

  const dispatch = useDispatch()
  const { formState } = useSelector(({ screens }) => screens.signup)

  const types = [
    {
      value: 'Agent/Broker',
      text: 'Agent/Broker'
    },
    {
      value: 'Lender',
      text: 'Lender'
    },
    {
      value: 'General Contractor',
      text: 'Contractor'
    }
  ]

  const handleServiceProviderType = (type) => {
    if (formState?.serviceProviderType) {
      if (formState?.serviceProviderType?.includes(type)) {
        dispatch(setFormState({ serviceProviderType: formState?.serviceProviderType?.filter(item => item !== type) }))
      } else {
        dispatch(setFormState({ serviceProviderType: [...formState?.serviceProviderType, type] }))
      }
    } else {
      dispatch(setFormState({ serviceProviderType: [type] }))
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContentContainer}
    >
      <Box alignItems='center' mb='6'>
        <HText style={styles.subtitle}>That’s Great</HText>
        <HText style={styles.description}>How would you describe your business</HText>
      </Box>
      {types.map(type => (
        <Box key={type.value} mb='2'>
          <HButton
            text={type.text}
            variant='outline'
            borderColor={formState?.serviceProviderType?.includes(type.value) ? colors.primary : colors.borderColor}
            backgroundColor={colors.white}
            textStyle={{
              color: formState?.serviceProviderType?.includes(type.value) ? colors.text01 : colors.text03,
              fontWeight: '500',
              fontSize: 16
            }}
            borderRadius={8}
            shadow='0'
            width={deviceWidth - 36}
            height={100}
            onPress={() => handleServiceProviderType(type.value)}
          />
        </Box>
      ))}

      <View style={styles.stepButtonContainer}>
        <HStack mb='6' alignItems='center'>
          <HCricleProgress
            fill={50}
            isShowChecked={formState?.serviceProviderType?.length}
          />
          <HText style={styles.stepTitle}>Step 1/2</HText>
        </HStack>

        <Box alignItems='center'>
          <HButton
            text='Next'
            backgroundColor={formState?.serviceProviderType?.length ? colors.primary : colors.text03}
            shadow='0'
            isDisabled={!formState?.serviceProviderType?.length}
            onPress={() => handleNextStep()}
          />
        </Box>
      </View>
    </ScrollView>
  )
}

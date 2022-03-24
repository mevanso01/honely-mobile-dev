import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { HText, HButton, HCricleProgress } from '../Shared'
import { Box, HStack } from 'native-base'
import { colors } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'
import styles from './style'

export const ConsumerTypeForm = (props) => {
  const {
    isLoading,
    formState,
    setFormState,
    handleCreateAccount
  } = props

  const types = [
    { value: 'Buyer', text: 'Buyer' },
    { value: 'Seller', text: 'Seller' },
    { value: 'Refinancer', text: 'Refinancing' },
    { value: 'Other', text: 'Just Browsing' }
  ]

  const handleHomeOwnerType = (type) => {
    if (formState?.homeOwnerType) {
      if (formState?.homeOwnerType?.includes(type)) {
        setFormState(prevState => ({
          ...prevState,
          homeOwnerType: prevState?.homeOwnerType?.filter(item => item !== type)
        }))
      } else {
        setFormState(prevState => ({
          ...prevState,
          homeOwnerType: [...prevState?.homeOwnerType, type]
        }))
      }
    } else {
      setFormState(prevState => ({
        ...prevState,
        homeOwnerType: [type]
      }))
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
            borderColor={formState?.homeOwnerType?.includes(type.value) ? colors.primary : colors.borderColor}
            backgroundColor={colors.white}
            textStyle={{ color: formState?.homeOwnerType?.includes(type.value) ? colors.text01 : colors.text03 }}
            borderRadius={8}
            shadow='0'
            width={deviceWidth - 36}
            size={20}
            isDisabled={isLoading}
            onPress={() => handleHomeOwnerType(type.value)}
          />
        </Box>
      ))}

      <View style={styles.stepButtonContainer}>
        <HStack mb='6' alignItems='center'>
          <HCricleProgress
            fill={100}
            isShowChecked={formState?.homeOwnerType?.length}
          />
          <HText style={styles.stepTitle}>Step 2/2</HText>
        </HStack>

        <Box alignItems='center'>
          <HButton
            text='Next'
            backgroundColor={formState?.homeOwnerType?.length  ? colors.primary : colors.text03}
            shadow='0'
            isDisabled={!formState?.homeOwnerType?.length}
            isLoading={isLoading}
            onPress={() => handleCreateAccount()}
          />
        </Box>
      </View>
    </ScrollView>
  )
}

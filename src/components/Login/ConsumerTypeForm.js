import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { HText, HButton, HCricleProgress } from '../Shared'
import { Box, Input, Icon, FormControl, HStack } from 'native-base'
import { colors } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'
import styles from './style'

export const ConsumerTypeForm = (props) => {
  const {
    handleNextStep
  } = props

  const [selectedType, setSelectedType] = useState(null)
  const types = [
    { value: 'buyer', text: 'Buyer' },
    { value: 'seller', text: 'Seller' },
    { value: 'refinancing', text: 'Refinancing' },
    { value: 'browsing', text: 'Just Browsing' }
  ]

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
            borderColor={selectedType === type.value ? colors.primary : colors.borderColor}
            backgroundColor={colors.white}
            textStyle={{ color: selectedType === type.value ? colors.text01 : colors.text03 }}
            borderRadius={8}
            shadow='0'
            width={deviceWidth - 36}
            size={20}
            onPress={() => setSelectedType(type.value)}
          />
        </Box>
      ))}

      <View style={styles.stepButtonContainer}>
        <HStack mb='6' alignItems='center'>
          <HCricleProgress
            fill={100}
            isShowChecked={!!selectedType}
          />
          <HText style={styles.stepTitle}>Step 2/2</HText>
        </HStack>

        <Box alignItems='center'>
          <HButton
            text='Next'
            backgroundColor={selectedType ? colors.primary : colors.text03}
            shadow='0'
            isDisabled={!selectedType}
            onPress={() => handleNextStep(selectedType)}
          />
        </Box>
      </View>
    </ScrollView>
  )
}

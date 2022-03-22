import React, { useState } from 'react'
import { View, Image, ScrollView } from 'react-native'
import { HText, HButton, HCricleProgress } from '../Shared'
import { Box, HStack, Input, FormControl, Icon } from 'native-base'
import { colors, icons } from '../../utils/styleGuide'
import { useForm, Controller } from 'react-hook-form'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from './style'

export const BusinessCompanyForm = (props) => {
  const { control, handleSubmit, formState: { errors, isValid }, watch } = useForm()
  const [isSubmitClicked, setIsSubmitClicked] = useState(false)
  const companyName = watch('name', '')

  const onSubmit = (values) => {
    Keyboard.dismiss()
    console.log(values)
  }

  const handleSubmitClick = () => {
    !isSubmitClicked && setIsSubmitClicked(true)
    handleSubmit(onSubmit)()
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContentContainer}
    >
      <Box alignItems='center' mb='6'>
        <HText style={styles.subtitle}>One last thing</HText>
        <HText style={styles.description}>What name does your business have</HText>
      </Box>
      <FormControl mb={4}>
        <FormControl.Label _text={styles.label} mb={1}>Company name</FormControl.Label>
        <Controller
          name='name'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder='e.g Keller Willaims Realty'
              placeholderTextColor={colors.text03}
              fontSize={14}
              borderRadius={8}
              fontWeight='500'
              height={50}
              borderColor={
                errors?.name?.message ? colors.error : (value && isSubmitClicked) ? colors.primary : colors.borderColor
              }
              autoCapitalize='none'
              autoCorrect={false}
              returnKeyType='done'
              value={value}
              onChangeText={val => onChange(val)}
              blurOnSubmit
              onSubmitEditing={handleSubmitClick}
              InputLeftElement={
                <Image
                  source={icons.company}
                  style={[
                    styles.inputIcon,
                    {tintColor: `${
                      errors?.name?.message
                        ? colors.error
                        : (value && isSubmitClicked) ? colors.primary : colors.text04
                      }`
                    }
                  ]}
                />
              }
              InputRightElement={
                (!errors?.name?.message && isSubmitClicked) && (
                  <Icon
                    as={<MaterialIcons name="check" />}
                    size={5} mr="4"
                    color={colors.primary}
                    onPress={() => setPasswordSee(!passwordSee)}
                  />
                )
              }
              _focus={{
                borderColor: !errors?.name?.message ? colors.primary : colors.error
              }}
              defaultValue=''
            />
          )}
          rules={{
            required: { value: true, message: 'The company name is required' },
          }}
        />
        {errors?.name?.message && (
          <View style={styles.errorTextWrapper}>
            <MaterialIcons name='warning' color={colors.error} />
            <HText style={styles.errorText}>{errors?.name?.message}</HText>
          </View>
        )}
      </FormControl>
      <View style={styles.stepButtonContainer}>
        <HStack mb='6' alignItems='center'>
          <HCricleProgress
            isShowChecked={companyName}
            fill={100}
          />
          <HText style={styles.stepTitle}>Step 3/3</HText>
        </HStack>

        <Box alignItems='center'>
          <HButton
            text='Finish'
            backgroundColor={companyName ? colors.primary : colors.text03}
            shadow='0'
            onPress={handleSubmitClick}
          />
        </Box>
      </View>
    </ScrollView>
  )
}

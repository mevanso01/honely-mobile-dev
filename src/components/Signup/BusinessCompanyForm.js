import React, { useState } from 'react'
import { View, Image, ScrollView, Keyboard } from 'react-native'
import { HText, HButton, HCricleProgress } from '../Shared'
import { Box, HStack, Input, FormControl, Icon, useToast } from 'native-base'
import { colors, icons } from '../../utils/styleGuide'
import { useForm, Controller } from 'react-hook-form'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from './style'

import { TOAST_LENGTH_SHORT } from '../../config'
import { useDispatch, useSelector } from 'react-redux'
import { setFormState, handleCreateAccount } from './store'

export const BusinessCompanyForm = (props) => {
  const { setSignUpFormStep } = props
  const toast = useToast()
  const dispatch = useDispatch()
  const { isLoading, formState } = useSelector(({ screens }) => screens.signup)

  const { control, handleSubmit, formState: { errors, isValid }, watch } = useForm({
    defaultValues: { company_name: formState?.company_name || '' }
  })
  const [isSubmitClicked, setIsSubmitClicked] = useState(false)
  const companyName = watch('company_name', '')

  const onSubmit = async (values) => {
    Keyboard.dismiss()
    try {
      dispatch(setFormState(values))
      await dispatch(handleCreateAccount())
      setSignUpFormStep('otp')
    } catch (error) {
      toast.show({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
    }
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
        <FormControl.Label _text={styles.label} mb={2}>Company name</FormControl.Label>
        <Controller
          name='company_name'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder='e.g Keller Willaims Realty'
              placeholderTextColor={colors.text03}
              fontSize={14}
              borderRadius={8}
              fontWeight='500'
              height={55}
              backgroundColor='transparent'
              borderColor={
                errors?.company_name?.message ? colors.error : (value && isSubmitClicked) ? colors.lightPrimary : colors.borderColor
              }
              autoCapitalize='none'
              autoCorrect={false}
              returnKeyType='done'
              isDisabled={isLoading}
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
                      errors?.company_name?.message
                        ? colors.error
                        : (value && isSubmitClicked) ? colors.lightPrimary : colors.text04
                      }`
                    }
                  ]}
                />
              }
              InputRightElement={
                (!errors?.company_name?.message && isSubmitClicked) && (
                  <Icon
                    as={<MaterialIcons name="check" />}
                    size={5} mr="4"
                    color={colors.lightPrimary}
                  />
                )
              }
              _focus={{
                borderColor: !errors?.company_name?.message ? colors.lightPrimary : colors.error
              }}
              defaultValue=''
            />
          )}
          rules={{
            required: { value: true, message: 'The company name is required' },
          }}
        />
        {errors?.company_name?.message && (
          <View style={styles.errorTextWrapper}>
            <MaterialIcons name='warning' color={colors.error} />
            <HText style={styles.errorText}>{errors?.company_name?.message}</HText>
          </View>
        )}
      </FormControl>
      <View style={styles.stepButtonContainer}>
        <HStack mb='6' alignItems='center'>
          <HCricleProgress
            isShowChecked={companyName}
            fill={100}
          />
          <HText style={styles.stepTitle}>Step 2/2</HText>
        </HStack>

        <Box alignItems='center'>
          <HButton
            text='Finish'
            backgroundColor={companyName ? colors.primary : colors.text03}
            shadow='0'
            onPress={handleSubmitClick}
            isLoading={isLoading}
          />
        </Box>
      </View>
    </ScrollView>
  )
}

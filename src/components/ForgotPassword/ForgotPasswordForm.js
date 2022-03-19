import React, { useState } from 'react'
import { View, Keyboard } from 'react-native'
import { HText, HButton } from '../Shared'
import { Box, Input, Icon, FormControl, HStack } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from './style'
import { useForm, Controller } from 'react-hook-form'
import { colors } from '../../utils/styleGuide'

export const ForgotPasswordForm = (props) => {
  const {
    setRecoverEmail,
    handleNextStep
  } = props

  const { control, handleSubmit, formState: { errors, isValid } } = useForm()
  const [isSubmitClicked, setIsSubmitClicked] = useState(false)

  const onSubmit = (values) => {
    Keyboard.dismiss()
    setRecoverEmail(values?.email)
    handleNextStep()
  }

  const handleSubmitClick = () => {
    !isSubmitClicked && setIsSubmitClicked(true)
    handleSubmit(onSubmit)()
  }

  return (
    <View>
      <Box alignItems='center' mb='8'>
        <HText style={styles.subtitle}>Forgot Password?</HText>
        <HText style={styles.description}>Don’t worry! it happens. Please enter the address associated with your account.</HText>
      </Box>
      <Box>
        <FormControl>
          <FormControl.Label _text={styles.label} mb={1}>Email/Mobile number</FormControl.Label>
          <Controller
            name='email'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Enter your email or Mobile number'
                placeholderTextColor={colors.text03}
                keyboardType="email-address"
                fontSize={14}
                borderRadius={8}
                height={50}
                borderColor={
                  errors?.email?.message ? colors.error : (value && isSubmitClicked) ? colors.primary : colors.borderColor
                }
                autoCapitalize='none'
                autoCorrect={false}
                autoCompleteType='email'
                returnKeyType='done'
                value={value}
                onChangeText={val => onChange(val)}
                blurOnSubmit
                onSubmitEditing={handleSubmitClick}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="email" />}
                    size={5} ml="4"
                    color={
                      errors?.email?.message
                        ? colors.error
                        : (value && isSubmitClicked) ? colors.primary : colors.text04
                      }
                  />
                }
                InputRightElement={
                  (!errors?.email?.message && isSubmitClicked) && (
                    <Icon
                      as={<MaterialIcons name="check" />}
                      size={5} mr="4"
                      color={colors.primary}
                      onPress={() => setPasswordSee(!passwordSee)}
                    />
                  )
                }
                _focus={{
                  borderColor: !errors?.email?.message ? colors.primary : colors.error
                }}
              />
            )}
            rules={{
              required: { value: true, message: 'The Email/Mobile number is required' },
            }}
          />
          {errors?.email?.message && (
            <HStack alignItems='center' mt={2}>
              <MaterialIcons name='warning' color={colors.error} />
              <HText style={styles.errorText}>{errors?.email?.message}</HText>
            </HStack>
          )}
        </FormControl>
      </Box>
      <Box alignItems='center' mt='6'>
        <HButton
          text='Submit'
          onPress={handleSubmitClick}
        />
      </Box>
    </View>
  )
}
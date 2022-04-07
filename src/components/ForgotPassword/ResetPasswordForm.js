import React, { useState, useRef } from 'react'
import { ScrollView, Keyboard, Image } from 'react-native'
import { Box, Input, FormControl, Icon, HStack, Pressable } from 'native-base'
import { HButton, HText } from '../Shared'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors, icons } from '../../utils/styleGuide'
import { useForm, Controller } from 'react-hook-form'
import styles from './style'

export const ResetPasswordForm = (props) => {
  const {
    isLoading,
    handleResetPassword
  } = props

  const { control, handleSubmit, formState: { errors, isValid }, watch } = useForm()
  const [newPasswordSee, setNewPasswordSee] = useState(false)
  const [confirmPasswordSee, setConfirmPasswordSee] = useState(false)
  const [isSubmitClicked, setIsSubmitClicked] = useState(false)

  const confirmPasswordRef = useRef()
  const new_password = useRef({})
  new_password.current = watch('new_password', '')

  const onSubmit = (values) => {
    Keyboard.dismiss()
    handleResetPassword(values?.new_password)
  }

  const handleSubmitClick = () => {
    !isSubmitClicked && setIsSubmitClicked(true)
    handleSubmit(onSubmit)()
  }

  const checkPasswordValidation = (value) => {
    if (!(/[\d]/i).test(value)) {
      return 'Password should contain at least 1 number'
    } else if (!(/[\!@#$%^&\*\(\)\_\+-]/i).test(value)) {
      return 'Password should contain at least 1 special charactor'
    } else if (!/(?=.*[A-Z])/.test(value)) {
      return 'Password should contain at least 1 uppercase character'
    } else if (!/(?=.*[a-z])/.test(value)) {
      return 'Password should contain at least 1 lowercase character'
    } else {
      return true
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <Box alignItems='center' mb='8'>
        <HText style={styles.subtitle}>Reset Password</HText>
      </Box>

      <Box>
        <FormControl>
          <FormControl.Label _text={styles.label} mb={2}>New password</FormControl.Label>
          <Controller
            name='new_password'
            rules={{
              required: { value: true, message: 'The new password is required' },
              minLength: { value: 8, message: 'At least 8 characters in length' },
              validate: checkPasswordValidation
            }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Enter your new password'
                type={newPasswordSee ? "text" : "password"}
                fontSize={14}
                borderRadius={8}
                height={50}
                borderColor={
                  errors?.new_password?.message ? colors.error : (value && isSubmitClicked) ? colors.lightPrimary : colors.borderColor
                }
                placeholderTextColor={colors.text03}
                autoCompleteType='password'
                returnKeyType='next'
                blurOnSubmit={false}
                isDisabled={isLoading}
                value={value}
                onChangeText={val => onChange(val)}
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                InputLeftElement={
                  <Image
                    source={icons.lock}
                    style={[
                      styles.inputIcon,
                      {tintColor: `${
                        errors?.new_password?.message
                          ? colors.error
                          : (value && isSubmitClicked) ? colors.lightPrimary : colors.text04
                        }`
                      }
                    ]}
                  />
                }
                InputRightElement={
                  <HStack>
                    {(!errors?.new_password?.message && isSubmitClicked) && (
                      <Icon
                        as={<MaterialIcons name="check" />}
                        size={5} mr="3"
                        color={colors.lightPrimary}
                        onPress={() => setNewPasswordSee(!newPasswordSee)}
                      />
                    )}
                    <Pressable
                      style={styles.visibilityIconWrapper}
                      onPress={() => setNewPasswordSee(!newPasswordSee)}
                    >
                      <Image
                        source={!newPasswordSee ? icons.visibility : icons.visibilityOff}
                        style={styles.visibilityIcon}
                      />
                    </Pressable>
                  </HStack>
                }
                _focus={{
                  borderColor: !errors?.new_password?.message ? colors.lightPrimary :colors.error
                }}
              />
            )}
          />
          {errors?.new_password?.message && (
            <HStack alignItems='center' mt={2}>
              <MaterialIcons name='warning' color={colors.error} />
              <HText style={styles.errorText}>{errors?.new_password?.message}</HText>
            </HStack>
          )}
        </FormControl>
        <FormControl mt='4'>
          <FormControl.Label _text={styles.label} mb={2}>Confirm new password</FormControl.Label>
          <Controller
            name='confirm_password'
            rules={{
              required: { value: true, message: 'The confirm new password is required' },
              validate: value => value === new_password.current || 'The passwords do not match'
            }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Confirm your new password'
                type={confirmPasswordSee ? "text" : "password"}
                fontSize={14}
                borderRadius={8}
                height={50}
                borderColor={
                  errors?.confirm_password?.message ? colors.error : (value && isSubmitClicked) ? colors.primary : colors.borderColor
                }
                placeholderTextColor={colors.text03}
                textContentType='oneTimeCode'
                autoCompleteType='password'
                ref={confirmPasswordRef}
                returnKeyType='done'
                blurOnSubmit
                isDisabled={isLoading}
                value={value}
                onChangeText={val => onChange(val)}
                onSubmitEditing={handleSubmitClick}
                InputLeftElement={
                  <Image
                    source={icons.lock}
                    style={[
                      styles.inputIcon,
                      {tintColor: `${
                        errors?.confirm_password?.message
                          ? colors.error
                          : (value && isSubmitClicked) ? colors.lightPrimary : colors.text04
                        }`
                      }
                    ]}
                  />
                }
                InputRightElement={
                  <HStack>
                    {(!errors?.confirm_password?.message && isSubmitClicked) && (
                      <Icon
                        as={<MaterialIcons name="check" />}
                        size={5} mr="3"
                        color={colors.lightPrimary}
                        onPress={() => setConfirmPasswordSee(!confirmPasswordSee)}
                      />
                    )}
                    <Pressable
                      style={styles.visibilityIconWrapper}
                      onPress={() => setConfirmPasswordSee(!confirmPasswordSee)}
                    >
                      <Image
                        source={!confirmPasswordSee ? icons.visibility : icons.visibilityOff}
                        style={styles.visibilityIcon}
                      />
                    </Pressable>
                  </HStack>
                }
                _focus={{
                  borderColor: !errors?.confirm_password?.message ? colors.lightPrimary :colors.error
                }}
              />
            )}
          />
          {errors?.confirm_password?.message && (
            <HStack alignItems='center' mt={2}>
              <MaterialIcons name='warning' color={colors.error} />
              <HText style={styles.errorText}>{errors?.confirm_password?.message}</HText>
            </HStack>
          )}
        </FormControl>
      </Box>
      
      <Box alignItems='center' mt={8}>
        <HButton
          text='Submit'
          onPress={handleSubmitClick}
          isLoading={isLoading}
        />
      </Box>
    </ScrollView>
  )
}

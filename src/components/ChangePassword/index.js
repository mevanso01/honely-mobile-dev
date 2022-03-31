import React, { useState, useRef } from 'react'
import { View, ScrollView, Image, Keyboard } from 'react-native'
import { HScreenHeader, HText, HButton } from '../Shared'
import { Pressable, VStack, HStack, Box, Input, FormControl, Icon, useToast } from 'native-base'
import { colors, icons } from '../../utils/styleGuide'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useForm, Controller } from 'react-hook-form'
import { TOAST_LENGTH_SHORT } from '../../config'
import styles from './style'

import config from '../../aws-exports'
import Amplify, { Auth } from 'aws-amplify'
Amplify.configure(config)

export const ChangePassword = (props) => {
  const {
    navigation
  } = props

  const toast = useToast()
  const { control, handleSubmit, formState: { errors, isValid }, watch } = useForm()
  const [currentPasswordSee, setCurrentPasswordSee] = useState(false)
  const [newPasswordSee, setNewPasswordSee] = useState(false)
  const [confirmPasswordSee, setConfirmPasswordSee] = useState(false)
  const [isSubmitClicked, setIsSubmitClicked] = useState(false)

  const newPasswordRef = useRef()
  const confirmPasswordRef = useRef()
  const newPassword = watch('new_password', '')

  const [isLoading, setIsLoading] = useState(false)

  const handleChangePassword = async (oldPassword, newPassword) => {
    try {
      setIsLoading(true)
      const user = await Auth.currentAuthenticatedUser()
      await Auth.changePassword(user, oldPassword, newPassword)
      toast.show({
        title: 'Success',
        description: 'Password Changed Succesfully.',
        status: 'success',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
    } catch (err) {
      let errorMessage = ''
      if (err.code == 'LimitExceededException') {
        errorMessage = "Password Limit Change Exceeded. Please try again later."
      }
      else if (err.code == 'NotAuthorizedException') {
        errorMessage = "Incorrect Current password provided."
      }
      else if (err.code == "InvalidPasswordException") {
        errorMessage = err.message
      }
      else {
        errorMessage = "Password Change Failed. Please check your network connection and try again"
      }
      toast.show({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = (values) => {
    Keyboard.dismiss()
    handleChangePassword(values.current_password, values.new_password)
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
    <View style={styles.container}>
      <HScreenHeader
        title='Change Password'
        onPress={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        <HText style={styles.title}>Change Password</HText>
        <FormControl mt='4'>
          <FormControl.Label _text={styles.label} mb={1}>Current Password</FormControl.Label>
          <Controller
            name='current_password'
            rules={{
              required: { value: true, message: 'The current password is required' },
            }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Enter your current password'
                type={currentPasswordSee ? "text" : "password"}
                fontSize={14}
                borderRadius={8}
                height={50}
                borderColor={
                  errors?.current_password?.message ? colors.error : (value && isSubmitClicked) ? colors.primary : colors.borderColor
                }
                placeholderTextColor={colors.text03}
                autoCompleteType='password'
                returnKeyType='next'
                blurOnSubmit={false}
                isDisabled={isLoading}
                value={value}
                onChangeText={val => onChange(val)}
                onSubmitEditing={() => newPasswordRef.current?.focus()}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="lock" />}
                    size={5} ml="4"
                    color={errors?.current_password?.message ? colors.error : (value && isSubmitClicked) ? colors.primary : colors.text04}
                  />
                }
                InputRightElement={
                  <HStack alignItems='center'>
                    {(!errors?.current_password?.message && isSubmitClicked) && (
                      <Icon
                        as={<MaterialIcons name="check" />}
                        size={5} mr="3"
                        color={colors.primary}
                      />
                    )}
                    <Pressable
                      style={styles.visibilityIconWrapper}
                      onPress={() => setCurrentPasswordSee(!currentPasswordSee)}
                    >
                      <Image
                        source={currentPasswordSee ? icons.visibilityOff : icons.visibility}
                        style={styles.visibilityIcon}
                      />
                    </Pressable>
                  </HStack>
                }
                _focus={{
                  borderColor: !errors?.current_password?.message ? colors.primary :colors.error
                }}
              />
            )}
          />
          {errors?.current_password?.message && (
            <HStack alignItems='center' mt={2}>
              <MaterialIcons name='warning' color={colors.error} />
              <HText style={styles.errorText}>{errors?.current_password?.message}</HText>
            </HStack>
          )}
        </FormControl>
        <FormControl mt='4'>
          <FormControl.Label _text={styles.label} mb={1}>New password</FormControl.Label>
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
                  errors?.new_password?.message ? colors.error : (value && isSubmitClicked) ? colors.primary : colors.borderColor
                }
                placeholderTextColor={colors.text03}
                autoCompleteType='password'
                ref={newPasswordRef}
                returnKeyType='next'
                blurOnSubmit={false}
                isDisabled={isLoading}
                value={value}
                onChangeText={val => onChange(val)}
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="lock" />}
                    size={5} ml="4"
                    color={errors?.new_password?.message ? colors.error : (value && isSubmitClicked) ? colors.primary : colors.text04}
                  />
                }
                InputRightElement={
                  <HStack alignItems='center'>
                    {(!errors?.new_password?.message && isSubmitClicked) && (
                      <Icon
                        as={<MaterialIcons name="check" />}
                        size={5} mr="3"
                        color={colors.primary}
                      />
                    )}
                    <Pressable
                      style={styles.visibilityIconWrapper}
                      onPress={() => setNewPasswordSee(!newPasswordSee)}
                    >
                      <Image
                        source={newPasswordSee ? icons.visibilityOff : icons.visibility}
                        style={styles.visibilityIcon}
                      />
                    </Pressable>
                  </HStack>
                }
                _focus={{
                  borderColor: !errors?.new_password?.message ? colors.primary :colors.error
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
          <FormControl.Label _text={styles.label} mb={1}>Confirm new password</FormControl.Label>
          <Controller
            name='confirm_password'
            rules={{
              required: { value: true, message: 'The confirm password is required' },
              validate: value => value === newPassword || 'The passwords do not match'
            }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Confirm your password'
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
                  <Icon
                    as={<MaterialIcons name="lock" />}
                    size={5} ml="4"
                    color={errors?.confirm_password?.message ? colors.error : (value && isSubmitClicked) ? colors.primary : colors.text04}
                  />
                }
                InputRightElement={
                  <HStack alignItems='center'>
                    {(!errors?.confirm_password?.message && isSubmitClicked) && (
                      <Icon
                        as={<MaterialIcons name="check" />}
                        size={5} mr="3"
                        color={colors.primary}
                      />
                    )}
                    <Pressable
                      style={styles.visibilityIconWrapper}
                      onPress={() => setConfirmPasswordSee(!confirmPasswordSee)}
                    >
                      <Image
                        source={confirmPasswordSee ? icons.visibilityOff : icons.visibility}
                        style={styles.visibilityIcon}
                      />
                    </Pressable>
                  </HStack>
                }
                _focus={{
                  borderColor: !errors?.confirm_password?.message ? colors.primary :colors.error
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
        <Box mt='10' alignItems='center'>
          <HButton
            text='Save Changes'
            onPress={() => handleSubmitClick()}
            isLoading={isLoading}
          />
        </Box>
      </ScrollView>
    </View>
  )
}

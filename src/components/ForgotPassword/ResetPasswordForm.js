import React, { useState, useRef } from 'react'
import { ScrollView, Keyboard } from 'react-native'
import { Box, Input, FormControl, Icon, HStack } from 'native-base'
import { HButton, HText } from '../Shared'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../utils/styleGuide'
import { useForm, Controller } from 'react-hook-form'
import styles from './style'

export const ResetPasswordForm = (props) => {
  const {
    handleNextStep
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
    handleNextStep()
  }

  const handleSubmitClick = () => {
    !isSubmitClicked && setIsSubmitClicked(true)
    handleSubmit(onSubmit)()
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
          <FormControl.Label _text={styles.label} mb={1}>New password</FormControl.Label>
          <Controller
            name='new_password'
            rules={{ required: { value: true, message: 'The new password is required' } }}
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
                returnKeyType='next'
                blurOnSubmit={false}
                value={value}
                onChangeText={val => onChange(val)}
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="lock" />}
                    size={5} ml="4"
                    color={errors?.password?.message ? colors.error : (value && isSubmitClicked) ? colors.primary : colors.text04}
                  />
                }
                InputRightElement={
                  <HStack>
                    {(!errors?.new_password?.message && isSubmitClicked) && (
                      <Icon
                        as={<MaterialIcons name="check" />}
                        size={5} mr="3"
                        color={colors.primary}
                        onPress={() => setNewPasswordSee(!newPasswordSee)}
                      />
                    )}
                    <Icon
                      as={<MaterialIcons name={newPasswordSee ? "visibility" : "visibility-off"} />}
                      size={5} mr="4"
                      color={colors.text04}
                      onPress={() => setNewPasswordSee(!newPasswordSee)}
                    />
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
                  <HStack>
                    {(!errors?.confirm_password?.message && isSubmitClicked) && (
                      <Icon
                        as={<MaterialIcons name="check" />}
                        size={5} mr="3"
                        color={colors.primary}
                        onPress={() => setConfirmPasswordSee(!confirmPasswordSee)}
                      />
                    )}
                    <Icon
                      as={<MaterialIcons name={confirmPasswordSee ? "visibility" : "visibility-off"} />}
                      size={5} mr="4"
                      color={colors.text04}
                      onPress={() => setConfirmPasswordSee(!confirmPasswordSee)}
                    />
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
      </Box>
      
      <Box alignItems='center' mt={8}>
        <HButton
          text='Submit'
          onPress={handleSubmitClick}
        />
      </Box>
    </ScrollView>
  )
}

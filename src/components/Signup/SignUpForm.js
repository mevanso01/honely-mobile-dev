import React, { useState, useRef } from 'react'
import { ScrollView, Image, View, Keyboard } from 'react-native'
import { HButton, HText } from '../Shared'
import { Box, Input, FormControl, Icon, HStack, Pressable, useToast } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useForm, Controller } from 'react-hook-form'
import { TOAST_LENGTH_SHORT } from '../../config'
import { colors, icons } from '../../utils/styleGuide'
import styles from './style'

export const SignUpForm = (props) => {
  const {
    isLoading,
    formState,
    setFormState,
    handleCheckUserNameExist,
    handleNextStep
  } = props

  const toast = useToast()
  const { control, handleSubmit, formState: { errors, isValid }, watch } = useForm({
    defaultValues: formState
  })
  const [isSubmitClicked, setIsSubmitClicked] = useState(false)
  const [passwordSee, setPasswordSee] = useState(false)
  const [confirmPasswordSee, setConfirmPasswordSee] = useState(false)

  const emailRef = useRef()
  const confirmPasswordRef = useRef()
  const passwordRef = useRef()
  passwordCurrent = watch('password', '')

  const onSubmit = async (values) => {
    Keyboard.dismiss()
    setFormState({
      ...formState,
      ...values
    })
    const checkExist = await handleCheckUserNameExist(values?.userName)
    if (checkExist) {
      toast.show({
        title: 'Error',
        description: 'Username already exists',
        status: 'error',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
    } else {
      handleNextStep()
    }
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

  const handleSubmitClick = () => {
    !isSubmitClicked && setIsSubmitClicked(true)
    handleSubmit(onSubmit)()
  }

  const handleChangeInputEmail = (value, onChange) => {
    onChange(value.toLowerCase().replace(/[&,()%";:ç?<>{}\\[\]\s]/g, ''))
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.signUpFormWrapper}
      contentContainerStyle={styles.scrollViewContentContainer}
    >
      <View>
        <FormControl mb={4}>
          <FormControl.Label _text={styles.label} mb={1}>Username</FormControl.Label>
          <Controller
            name='userName'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                keyboardType='default'
                placeholder='e.g Jonathanshah01'
                placeholderTextColor={colors.text03}
                fontSize={14}
                borderRadius={8}
                height={50}
                borderColor={
                  errors?.userName?.message ? colors.error : (value && isSubmitClicked) ? colors.primary : colors.borderColor
                }
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='next'
                isDisabled={isLoading}
                value={value}
                onChangeText={val => onChange(val)}
                blurOnSubmit={false}
                onSubmitEditing={() => emailRef.current?.focus()}
                InputLeftElement={
                  <Image
                    source={icons.user}
                    style={[
                      styles.inputIcon,
                      {tintColor: `${
                        errors?.userName?.message
                          ? colors.error
                          : (value && isSubmitClicked) ? colors.primary : colors.text04
                        }`
                      }
                    ]}
                  />
                }
                InputRightElement={
                  (!errors?.userName?.message && isSubmitClicked) && (
                    <Icon
                      as={<MaterialIcons name="check" />}
                      size={5} mr="4"
                      color={colors.primary}
                    />
                  )
                }
                _focus={{
                  borderColor: !errors?.userName?.message ? colors.primary : colors.error
                }}
              />
            )}
            rules={{
              required: { value: true, message: 'The field username is required' },
              minLength: { value: 5, message: 'The Username has to be at least 5 characters' },
              validate: value => !(/[\s!@#$%^&\*\(\)\_\+-]/i).test(value) || 'The username can not contain number or special charactors'
            }}
          />
          {errors?.userName?.message && (
            <View style={styles.errorTextWrapper}>
              <MaterialIcons name='warning' color={colors.error} />
              <HText style={styles.errorText}>{errors?.userName?.message}</HText>
            </View>
          )}
        </FormControl>
        <FormControl mb={4}>
          <FormControl.Label _text={styles.label} mb={1}>Email</FormControl.Label>
          <Controller
            name='email'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='e.g jshah@mail.com'
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
                returnKeyType='next'
                isDisabled={isLoading}
                value={value}
                onChangeText={val => handleChangeInputEmail(val, onChange)}
                ref={emailRef}
                onSubmitEditing={() => passwordRef.current?.focus()}
                blurOnSubmit={false}
                InputLeftElement={
                  <Image
                    source={icons.email}
                    style={[
                      styles.inputIcon,
                      {tintColor: `${
                        errors?.email?.message
                          ? colors.error
                          : (value && isSubmitClicked) ? colors.primary : colors.text04
                        }`
                      }
                    ]}
                  />
                }
                InputRightElement={
                  (!errors?.email?.message && isSubmitClicked) && (
                    <Icon
                      as={<MaterialIcons name="check" />}
                      size={5} mr="4"
                      color={colors.primary}
                    />
                  )
                }
                _focus={{
                  borderColor: !errors?.email?.message ? colors.primary : colors.error
                }}
              />
            )}
            rules={{
              required: { value: true, message: 'The field Email is required' },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email'
              }
            }}
          />
          {errors?.email?.message && (
            <View style={styles.errorTextWrapper}>
              <MaterialIcons name='warning' color={colors.error} />
              <HText style={styles.errorText}>{errors?.email?.message}</HText>
            </View>
          )}
        </FormControl>
        <FormControl>
          <FormControl.Label _text={styles.label} mb={1}>Password</FormControl.Label>
          <Controller
            name='password'
            rules={{
              required: { value: true, message: 'The password is required' },
              minLength: { value: 8, message: 'At least 8 characters in length' },
              validate: checkPasswordValidation
            }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                secureTextEntry={passwordSee ? false : true}
                placeholder='Enter your password'
                type={passwordSee ? "text" : "password"}
                fontSize={14}
                borderRadius={8}
                height={50}
                borderColor={
                  errors?.password?.message ? colors.error : (value && isSubmitClicked) ? colors.primary : colors.borderColor
                }
                placeholderTextColor={colors.text03}
                textContentType='oneTimeCode'
                autoCompleteType='password'
                returnKeyType='next'
                blurOnSubmit={false}
                isDisabled={isLoading}
                value={value}
                onChangeText={val => onChange(val)}
                ref={passwordRef}
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                InputLeftElement={
                  <Image
                    source={icons.lock}
                    style={[
                      styles.inputIcon,
                      {tintColor: `${
                        errors?.password?.message
                          ? colors.error
                          : (value && isSubmitClicked) ? colors.primary : colors.text04
                        }`
                      }
                    ]}
                  />
                }
                InputRightElement={
                  <HStack alignItems='center'>
                    {(!errors?.password?.message && isSubmitClicked) && (
                      <Icon
                        as={<MaterialIcons name="check" />}
                        size={5} mr="3"
                        color={colors.primary}
                      />
                    )}
                    <Pressable
                      style={styles.visibilityIconWrapper}
                      onPress={() => setPasswordSee(!passwordSee)}
                    >
                      <Image
                        source={passwordSee ? icons.visibility : icons.visibilityOff}
                        style={styles.visibilityIcon}
                      />
                    </Pressable>
                  </HStack>
                }
                _focus={{
                  borderColor: !errors?.password?.message ? colors.primary :colors.error
                }}
              />
            )}
          />
          {errors?.password?.message && (
            <HStack alignItems='center' mt={2}>
              <MaterialIcons name='warning' color={colors.error} />
              <HText style={styles.errorText}>{errors?.password?.message}</HText>
            </HStack>
          )}
        </FormControl>
        <FormControl mt='4'>
          <FormControl.Label _text={styles.label} mb={1}>Confirm password</FormControl.Label>
          <Controller
            name='confirm_password'
            rules={{
              required: { value: true, message: 'The confirm password is required' },
              validate: value => value === passwordCurrent || 'The passwords do not match'
            }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                secureTextEntry={confirmPasswordSee ? false : true}
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
                  <Image
                    source={icons.lock}
                    style={[
                      styles.inputIcon,
                      {tintColor: `${
                        errors?.password?.message
                          ? colors.error
                          : (value && isSubmitClicked) ? colors.primary : colors.text04
                        }`
                      }
                    ]}
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
                        source={confirmPasswordSee ? icons.visibility : icons.visibilityOff}
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
      </View>

      <Box alignItems='center' mt='8' mb='6'>
        <HButton
          text='Next'
          onPress={handleSubmitClick}
          isLoading={isLoading}
        />
      </Box>
    </ScrollView>
  )
}

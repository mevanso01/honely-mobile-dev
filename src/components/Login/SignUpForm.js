import React, { useState, useRef } from 'react'
import { ScrollView, Image, View, Keyboard } from 'react-native'
import { HButton, HText } from '../Shared'
import { Box, Input, FormControl, Icon, HStack, Pressable } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useForm, Controller } from 'react-hook-form'
import { colors, icons } from '../../utils/styleGuide'
import styles from './style'

export const SignUpForm = (props) => {
  const {
    formState,
    handleNextStep
  } = props

  const { control, handleSubmit, formState: { errors, isValid }, watch } = useForm({
    defaultValues: formState
  })
  const [isSubmitClicked, setIsSubmitClicked] = useState(false)
  const [passwordSee, setPasswordSee] = useState(false)
  const [confirmPasswordSee, setConfirmPasswordSee] = useState(false)

  const fullnameRef = useRef()
  const emailRef = useRef()
  const phonenumberRef = useRef()
  const confirmPasswordRef = useRef()
  const passwordRef = useRef()
  passwordCurrent = watch('password', '')

  const onSubmit = (values) => {
    Keyboard.dismiss()
    handleNextStep(values)
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
    >
      <FormControl mb={4}>
        <FormControl.Label _text={styles.label} mb={1}>Username</FormControl.Label>
        <Controller
          name='username'
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
                errors?.username?.message ? colors.error : (value && isSubmitClicked) ? colors.primary : colors.borderColor
              }
              autoCapitalize='none'
              autoCorrect={false}
              returnKeyType='next'
              value={value}
              onChangeText={val => onChange(val)}
              blurOnSubmit={false}
              onSubmitEditing={() => fullnameRef.current?.focus()}
              InputLeftElement={
                <Image
                  source={icons.user}
                  style={[
                    styles.inputIcon,
                    {tintColor: `${
                      errors?.username?.message
                        ? colors.error
                        : (value && isSubmitClicked) ? colors.primary : colors.text04
                      }`
                    }
                  ]}
                />
              }
              InputRightElement={
                (!errors?.username?.message && isSubmitClicked) && (
                  <Icon
                    as={<MaterialIcons name="check" />}
                    size={5} mr="4"
                    color={colors.primary}
                    onPress={() => setPasswordSee(!passwordSee)}
                  />
                )
              }
              _focus={{
                borderColor: !errors?.username?.message ? colors.primary : colors.error
              }}
            />
          )}
          rules={{
            required: { value: true, message: 'The field username is required' },
          }}
        />
        {errors?.username?.message && (
          <View style={styles.errorTextWrapper}>
            <MaterialIcons name='warning' color={colors.error} />
            <HText style={styles.errorText}>{errors?.username?.message}</HText>
          </View>
        )}
      </FormControl>
      <FormControl mb={4}>
        <FormControl.Label _text={styles.label} mb={1}>Full name</FormControl.Label>
        <Controller
          name='fullname'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder='e.g John Doe'
              placeholderTextColor={colors.text03}
              fontSize={14}
              borderRadius={8}
              height={50}
              borderColor={
                errors?.fullname?.message ? colors.error : (value && isSubmitClicked) ? colors.primary : colors.borderColor
              }
              autoCapitalize='none'
              autoCorrect={false}
              returnKeyType='next'
              value={value}
              onChangeText={val => onChange(val)}
              blurOnSubmit={false}
              ref={fullnameRef}
              onSubmitEditing={() => emailRef.current?.focus()}
              InputLeftElement={
                <Image
                  source={icons.user}
                  style={[
                    styles.inputIcon,
                    {tintColor: `${
                      errors?.fullname?.message
                        ? colors.error
                        : (value && isSubmitClicked) ? colors.primary : colors.text04
                      }`
                    }
                  ]}
                />
              }
              InputRightElement={
                (!errors?.fullname?.message && isSubmitClicked) && (
                  <Icon
                    as={<MaterialIcons name="check" />}
                    size={5} mr="4"
                    color={colors.primary}
                    onPress={() => setPasswordSee(!passwordSee)}
                  />
                )
              }
              _focus={{
                borderColor: !errors?.fullname?.message ? colors.primary : colors.error
              }}
            />
          )}
          rules={{
            required: { value: true, message: 'The field fullname is required' },
          }}
        />
        {errors?.fullname?.message && (
          <View style={styles.errorTextWrapper}>
            <MaterialIcons name='warning' color={colors.error} />
            <HText style={styles.errorText}>{errors?.fullname?.message}</HText>
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
              value={value}
              onChangeText={val => handleChangeInputEmail(val, onChange)}
              ref={emailRef}
              onSubmitEditing={() => phonenumberRef.current?.focus()}
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
      <FormControl mb={4}>
        <FormControl.Label _text={styles.label} mb={1}>Phone number</FormControl.Label>
        <Controller
          name='phonenumber'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder='e.g +1 234 2892 2892'
              placeholderTextColor={colors.text03}
              keyboardType="number-pad"
              fontSize={14}
              borderRadius={8}
              height={50}
              borderColor={
                errors?.phonenumber?.message ? colors.error : (value && isSubmitClicked) ? colors.primary : colors.borderColor
              }
              autoCapitalize='none'
              autoCorrect={false}
              returnKeyType='next'
              value={value}
              onChangeText={val => handleChangeInputEmail(val, onChange)}
              ref={phonenumberRef}
              onSubmitEditing={() => passwordRef.current?.focus()}
              blurOnSubmit={false}
              InputLeftElement={
                <Image
                  source={icons.phone}
                  style={[
                    styles.inputIcon,
                    {tintColor: `${
                      errors?.phonenumber?.message
                        ? colors.error
                        : (value && isSubmitClicked) ? colors.primary : colors.text04
                      }`
                    }
                  ]}
                />
              }
              InputRightElement={
                (!errors?.phonenumber?.message && isSubmitClicked) && (
                  <Icon
                    as={<MaterialIcons name="check" />}
                    size={5} mr="4"
                    color={colors.primary}
                    onPress={() => setPasswordSee(!passwordSee)}
                  />
                )
              }
              _focus={{
                borderColor: !errors?.phonenumber?.message ? colors.primary : colors.error
              }}
            />
          )}
          rules={{
            required: { value: true, message: 'The field phone number is required' },
          }}
        />
        {errors?.phonenumber?.message && (
          <View style={styles.errorTextWrapper}>
            <MaterialIcons name='warning' color={colors.error} />
            <HText style={styles.errorText}>{errors?.phonenumber?.message}</HText>
          </View>
        )}
      </FormControl>
      <FormControl>
        <FormControl.Label _text={styles.label} mb={1}>Password</FormControl.Label>
        <Controller
          name='password'
          rules={{ required: { value: true, message: 'The password is required' } }}
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
                      onPress={() => setPasswordSee(!passwordSee)}
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
                      onPress={() => setConfirmPasswordSee(!confirmPasswordSee)}
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

      <Box alignItems='center' mt='6' mb='6'>
        <HButton
          text='Sign Up'
          onPress={handleSubmitClick}
        />
      </Box>
    </ScrollView>
  )
}

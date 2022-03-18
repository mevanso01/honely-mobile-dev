import React, { useState, useRef, useEffect } from 'react'
import { View, Keyboard } from 'react-native'
import { HButton, HText, HSliderButton, HPressableText } from '../Shared'
import { Box, Input, FormControl, Icon, IconButton } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../utils/styleGuide'
import { useForm, Controller } from 'react-hook-form'

import styles from './style'

export const Login = (props) => {
  const {
    navigation,
    onNavigationRedirect
  } = props

  const { control, handleSubmit, formState: { errors, isValid } } = useForm()
  const [passwordSee, setPasswordSee] = useState(false)
  const inputRef = useRef()

  const onSubmit = (values) => {
    Keyboard.dismiss()
    console.log(values)
  }

  const handleChangeInputEmail = (value, onChange) => {
    onChange(value.toLowerCase().replace(/[&,()%";:ç?<>{}\\[\]\s]/g, ''))
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.backArrow}>
          <IconButton
            borderRadius='full'
            variant='ghost'
            size='8'
            _icon={{
              as: MaterialIcons,
              name: 'chevron-left',
              color: colors.black,
            }}
            _pressed={{
              bg: colors.text05
            }}
            onPress={() => navigation.goBack()}
          />
        </View>
        <HText style={styles.title}>Login</HText>
      </View>

      <HSliderButton
        onFirstPress={() => {}}
        onSecondPress={() => {}}
      />
  
      <Box mt={8}>
        <FormControl
          mb={4}
          isInvalid={errors?.email?.message}
        >
          <FormControl.Label _text={styles.label} mb={1}>Email</FormControl.Label>
          <Controller
            name='email'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Enter your email or username'
                placeholderTextColor={colors.text03}
                keyboardType="email-address"
                fontSize={14}
                borderRadius={8}
                height={50}
                borderColor={colors.borderColor}
                autoCapitalize='none'
                autoCorrect={false}
                autoCompleteType='email'
                returnKeyType='next'
                value={value}
                onChangeText={val => handleChangeInputEmail(val, onChange)}
                onSubmitEditing={() => inputRef.current?.focus()}
                blurOnSubmit={false}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="email" />}
                    size={5} ml="4"
                    color={colors.text04}
                  />
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
          <FormControl.ErrorMessage
            leftIcon={
              <MaterialIcons name='warning' color={colors.error} />
            }
            mt={1}
            _text={styles.errorText}
          >
            {errors?.email?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={errors?.password?.message}
        >
          <FormControl.Label _text={styles.label} mb={1}>Password</FormControl.Label>
          <Controller
            name='password'
            rules={{ required: { value: true, message: 'The field Password is required' } }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Enter your password'
                type={passwordSee ? "text" : "password"}
                fontSize={14}
                borderRadius={8}
                height={50}
                borderColor={colors.borderColor}
                placeholderTextColor={colors.text03}
                autoCompleteType='password'
                ref={inputRef}
                returnKeyType='done'
                blurOnSubmit
                value={value}
                onChangeText={val => onChange(val)}
                onSubmitEditing={handleSubmit(onSubmit)}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="lock" />}
                    size={5} ml="4"
                    color={colors.text04}
                  />
                }
                InputRightElement={
                  <Icon
                    as={<MaterialIcons name={passwordSee ? "visibility" : "visibility-off"} />}
                    size={5} mr="4"
                    color={colors.text04}
                    onPress={() => setPasswordSee(!passwordSee)}
                  />
                }
                _focus={{
                  borderColor: !errors?.password?.message ? colors.primary :colors.error
                }}
              />
            )}
          />
          <FormControl.ErrorMessage
            leftIcon={
              <MaterialIcons name='warning' color={colors.error} />
            }
            mt={1}
            _text={styles.errorText}
          >
            {errors?.password?.message}
          </FormControl.ErrorMessage>
        </FormControl>
      </Box>
      
      <View style={styles.forgotLink}>
        <HPressableText
          text='Forgot password?'
          onPress={() => {}}
        />
      </View>
      <Box alignItems='center' mt={8}>
        <HButton
          text='Log in'
          onPress={handleSubmit(onSubmit)}
        />
      </Box>
    </View>
  )
}

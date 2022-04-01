import React, { useState, useRef } from 'react'
import { View, Keyboard, Image, ScrollView } from 'react-native'
import { HButton, HText, HPressableText } from '../Shared'
import { Box, Input, FormControl, Icon, HStack, Pressable, useToast } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors, icons } from '../../utils/styleGuide'
import { useForm, Controller } from 'react-hook-form'
import { doGet } from '../../services/http-client'
import { TOAST_LENGTH_SHORT } from '../../config'
import { useDispatch, useSelector } from 'react-redux'
import { cognitoSignIn } from '../../store/reducer/cognitoUser'
import { setUser } from '../../store/action/setUser'
import styles from './style'

export const LoginForm = (props) => {
  const {
    onNavigationRedirect,
  } = props

  const { control, handleSubmit, formState: { errors, isValid } } = useForm()
  const [passwordSee, setPasswordSee] = useState(false)
  const [isLoginClicked, setIsLoginClicked] = useState(false)
  const inputRef = useRef()

  const toast = useToast()
  const dispatch = useDispatch()
  const cognitoUser = useSelector(state => state.cognitoUser)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (values) => {
    try {
      setIsLoading(true)
      const response = await doGet('lookup/user_name_fetch', { user_identifier: values.email })
      if (response.result === 'Error.') {
        throw response;
      }
      try {
        await dispatch(cognitoSignIn({ username: response.user_name, password: values.password }))
        getUserProfile(values.email)
      } catch (error) {
        setIsLoading(false)
        toast.show({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: TOAST_LENGTH_SHORT,
          marginRight: 4,
          marginLeft: 4,
        })
      }
    } catch (error) {
      setIsLoading(false)
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
  
  const getUserProfile = async (email) => {
    try {
      const response = await doGet('lookup-test/user_profile', { email: email })
      if (response?.message) {
        throw response
      }
      dispatch(setUser({ ...response, isLoggedIn: true }))
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
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

  const onSubmit = (values) => {
    Keyboard.dismiss()
    handleLogin(values)
  }

  const handleLoginClick = () => {
    !isLoginClicked && setIsLoginClicked(true)
    handleSubmit(onSubmit)()
  }

  const handleChangeInputEmail = (value, onChange) => {
    onChange(value.toLowerCase().replace(/[&,()%";:ç?<>{}\\[\]\s]/g, ''))
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <Box mt={8}>
        <FormControl mb={4}>
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
                borderColor={
                  errors?.email?.message ? colors.error : (value && isLoginClicked) ? colors.primary : colors.borderColor
                }
                autoCapitalize='none'
                autoCorrect={false}
                autoCompleteType='email'
                returnKeyType='next'
                isDisabled={isLoading}
                value={value}
                onChangeText={val => handleChangeInputEmail(val, onChange)}
                onSubmitEditing={() => inputRef.current?.focus()}
                blurOnSubmit={false}
                InputLeftElement={
                  <Image
                    source={icons.email}
                    style={[
                      styles.inputIcon,
                      {tintColor: `${
                        errors?.email?.message
                          ? colors.error
                          : (value && isLoginClicked) ? colors.primary : colors.text04
                        }`
                      }
                    ]}
                  />
                }
                InputRightElement={
                  (!errors?.email?.message && isLoginClicked) && (
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
                defaultValue=''
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
            rules={{ required: { value: true, message: 'The field Password is required' } }}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Enter your password'
                type={passwordSee ? "text" : "password"}
                fontSize={14}
                borderRadius={8}
                height={50}
                borderColor={
                  errors?.password?.message ? colors.error : (value && isLoginClicked) ? colors.primary : colors.borderColor
                }
                placeholderTextColor={colors.text03}
                autoCompleteType='password'
                ref={inputRef}
                returnKeyType='done'
                blurOnSubmit
                isDisabled={isLoading}
                value={value}
                onChangeText={val => onChange(val)}
                onSubmitEditing={handleLoginClick}
                InputLeftElement={
                  <Image
                    source={icons.lock}
                    style={[
                      styles.inputIcon,
                      {tintColor: `${
                        errors?.password?.message
                          ? colors.error
                          : (value && isLoginClicked) ? colors.primary : colors.text04
                        }`
                      }
                    ]}
                  />
                }
                InputRightElement={
                  <HStack alignItems='center'>
                    {(!errors?.password?.message && isLoginClicked) && (
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
                defaultValue=''
              />
            )}
          />
          {errors?.password?.message && (
            <View style={styles.errorTextWrapper}>
              <MaterialIcons name='warning' color={colors.error} />
              <HText style={styles.errorText}>{errors?.password?.message}</HText>
            </View>
          )}
        </FormControl>
      </Box>
      
      <View style={styles.forgotLink}>
        <HPressableText
          text='Forgot password?'
          onPress={() => onNavigationRedirect('ForgotPassword')}
        />
      </View>
      <Box alignItems='center' mt={8}>
        <HButton
          text='Log in'
          onPress={handleLoginClick}
          isLoading={isLoading}
        />
      </Box>
    </ScrollView>
  )
}

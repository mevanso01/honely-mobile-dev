import React, { useState, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from 'styled-components/native'
import { HButton, HText, HIconButton, HInput } from '../Shared'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  HeaderWrapper,
  ToggleWrapper,
  InputWrapper,
  SubmitBtnWrapper
} from './styles'

export const Login = (props) => {
  const {
    navigation,
    onNavigationRedirect
  } = props

  const theme = useTheme()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordSee, setPasswordSee] = useState(false)

  const inputRef = useRef()

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      paddingHorizontal: 18,
      paddingVertical: 30
    },
    leftArrow: {
      position: 'absolute',
      left: 0,
      top: 3,
      width: 9,
      height: 16,
      paddingHorizontal: 0
    },
    loginBtn: {
      width: 120,
      height: 50
    },
    signinBtn: {
      width: 120,
      height: 50
    },
    btnWrapper: {
      flexDirection: 'row',
      width: 240,
      borderRadius: 25,
      backgroundColor: theme.colors.primaryContrast
    },
    submitBtn: {
      width: 180
    }
  })

  return (
    <View style={styles.wrapper}>
      <HeaderWrapper>
        <HIconButton
          icon={theme.icons.leftArrow}
          borderColor='transparent'
          iconStyle={{ width: 9, height: 16 }}
          style={styles.leftArrow}
          onClick={() => navigation?.canGoBack() && navigation.goBack()}
        />
        <HText
          style={{ fontSize: 16 }}
          color={theme.colors.text01}
          weight='500'
        >
          Login
        </HText>
      </HeaderWrapper>
      <ToggleWrapper>
        <View style={styles.btnWrapper}>
          <HButton
            text='Log In'
            style={styles.loginBtn}
            onClick={() => onNavigationRedirect('Login')}
          />
          <HButton
            text='Sign Up'
            bgColor='transparent'
            borderColor='transparent'
            textStyle={{ color: theme.colors.text03 }}
            style={styles.signinBtn}
            onClick={() => onNavigationRedirect('Login')}
          />
        </View>
      </ToggleWrapper>
      <InputWrapper>
        <HText
          style={{ fontSize: 16, marginBottom: 5 }}
          color={theme.colors.headingColor}
          weight='500'
        >
          Email
        </HText>
        <HInput
          placeholder='Enter your email'
          icon={theme.icons.message}
          value={email}
          borderColor={theme.colors.borderColor}
          onChange={val => setEmail(val)}
          autoCapitalize='none'
          autoCorrect={false}
          autoCompleteType='email'
          returnKeyType='next'
          onSubmitEditing={() => inputRef.current?.focus()}
          blurOnSubmit={false}
        />
      </InputWrapper>
      <InputWrapper>
        <HText
          style={{ fontSize: 16, marginBottom: 5 }}
          color={theme.colors.headingColor}
          weight='500'
        >
          Password
        </HText>
        <HInput
          isSecured={!passwordSee ? true : false}
          placeholder='Enter your password'
          icon={theme.icons.lock}
          iconCustomRight={
            !passwordSee ?
              <MaterialCommunityIcons
                color={theme.colors.text04}
                name='eye-outline'
                size={24}
                onPress={() => setPasswordSee(!passwordSee)}
              /> :
              <MaterialCommunityIcons
                name='eye-off-outline'
                size={24}
                color={theme.colors.text04}
                onPress={() => setPasswordSee(!passwordSee)}
              />
          }
          value={password}
          borderColor={theme.colors.borderColor}
          onChange={val => setPassword(val)}
          autoCompleteType='password'
          forwardRef={inputRef}
          returnKeyType='done'
          // onSubmitEditing={handleSubmit(onSubmit)}
          blurOnSubmit
        />
      </InputWrapper>
      <TouchableOpacity>
        <HText
          style={{ fontSize: 16, textAlign: 'right' }}
          color={theme.colors.primary}
          weight='500'
        >
          Forgot password?
        </HText>
      </TouchableOpacity>

      <SubmitBtnWrapper>
        <HButton
          text='Log In'
          style={styles.submitBtn}
          onClick={() => onNavigationRedirect('Login')}
        />
      </SubmitBtnWrapper>

    </View>
  )
}

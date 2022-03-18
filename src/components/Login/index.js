import React, { useState, useRef } from 'react'
import { View } from 'react-native'
import { HButton, HText, HSliderButton, HPressableText } from '../Shared'
import { Box, Input, FormControl, Icon, IconButton } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../utils/styleGuide'

import styles from './style'

export const Login = (props) => {
  const {
    navigation,
    onNavigationRedirect
  } = props

  const [passwordSee, setPasswordSee] = useState(false)
  const inputRef = useRef()

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
        >
          <FormControl.Label _text={styles.label} mb={1}>Email</FormControl.Label>
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
            onSubmitEditing={() => inputRef.current?.focus()}
            blurOnSubmit={false}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="email" />}
                size={5} ml="4"
                color={colors.text04}
              />
            }
            _invalid={{
              borderColor: colors.error
            }}
            _focus={{
              borderColor: colors.primary
            }}
          />
          <FormControl.ErrorMessage
            leftIcon={
              <MaterialIcons name='warning' color={colors.error} />
            }
            mt={1}
            _text={styles.errorText}
          >
            Invalid email 
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl>
          <FormControl.Label
            _text={styles.label}
            mb={1}
          >Password</FormControl.Label>
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
            _invalid={{
              borderColor: colors.error
            }}
            _focus={{
              borderColor: colors.primary
            }}
          />
          <FormControl.ErrorMessage
            leftIcon={
              <MaterialIcons name='warning' color={colors.error} />
            }
            mt={1}
            _text={styles.errorText}
          >
            Invalid password
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
        />
      </Box>
    </View>
  )
}

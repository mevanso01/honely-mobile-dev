import React, { useState, useRef } from 'react'
import { ScrollView, Image, View, Keyboard } from 'react-native'
import { HButton, HText } from '../Shared'
import { Box, Input, FormControl, Icon, HStack, Pressable, Checkbox } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useForm, Controller } from 'react-hook-form'
import { TOAST_LENGTH_SHORT } from '../../config'
import { colors, icons } from '../../utils/styleGuide'
import styles from './style'

export const SignUpAgreeForm = (props) => {
  const {
    isLoading,
    formState,
    setFormState,
    handleNextStep
  } = props

  const { control, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: formState
  })
  const [isSubmitClicked, setIsSubmitClicked] = useState(false)

  const lastNameRef = useRef()
  const phonenumberRef = useRef()

  const onSubmit = async (values) => {
    Keyboard.dismiss()
    setFormState({
      ...formState,
      ...values
    })
    handleNextStep()
  }
  const handleSubmitClick = () => {
    !isSubmitClicked && setIsSubmitClicked(true)
    handleSubmit(onSubmit)()
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.signUpFormWrapper}
      contentContainerStyle={styles.scrollViewContentContainer}
    >
      <View>
        <FormControl mb={4}>
          <FormControl.Label _text={styles.label} mb={1}>First Name</FormControl.Label>
          <Controller
            name='firstName'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='First Name'
                placeholderTextColor={colors.text03}
                fontSize={14}
                borderRadius={8}
                height={50}
                borderColor={
                  errors?.firstName?.message ? colors.error : (value && isSubmitClicked) ? colors.primary : colors.borderColor
                }
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='next'
                isDisabled={isLoading}
                value={value}
                onChangeText={val => onChange(val)}
                blurOnSubmit={false}
                onSubmitEditing={() => lastNameRef.current?.focus()}
                InputLeftElement={
                  <Image
                    source={icons.user}
                    style={[
                      styles.inputIcon,
                      {tintColor: `${
                        errors?.firstName?.message
                          ? colors.error
                          : (value && isSubmitClicked) ? colors.primary : colors.text04
                        }`
                      }
                    ]}
                  />
                }
                InputRightElement={
                  (!errors?.firstName?.message && isSubmitClicked) && (
                    <Icon
                      as={<MaterialIcons name="check" />}
                      size={5} mr="4"
                      color={colors.primary}
                      onPress={() => setPasswordSee(!passwordSee)}
                    />
                  )
                }
                _focus={{
                  borderColor: !errors?.firstName?.message ? colors.primary : colors.error
                }}
              />
            )}
            rules={{
              required: { value: true, message: 'The field first name is required' },
            }}
          />
          {errors?.firstName?.message && (
            <View style={styles.errorTextWrapper}>
              <MaterialIcons name='warning' color={colors.error} />
              <HText style={styles.errorText}>{errors?.firstName?.message}</HText>
            </View>
          )}
        </FormControl>
        <FormControl mb={4}>
          <FormControl.Label _text={styles.label} mb={1}>Last Name</FormControl.Label>
          <Controller
            name='lastName'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='First Name'
                placeholderTextColor={colors.text03}
                fontSize={14}
                borderRadius={8}
                height={50}
                borderColor={
                  errors?.lastName?.message ? colors.error : (value && isSubmitClicked) ? colors.primary : colors.borderColor
                }
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='next'
                isDisabled={isLoading}
                ref={lastNameRef}
                value={value}
                onChangeText={val => onChange(val)}
                blurOnSubmit={false}
                onSubmitEditing={() => phonenumberRef.current?.focus()}
                InputLeftElement={
                  <Image
                    source={icons.user}
                    style={[
                      styles.inputIcon,
                      {tintColor: `${
                        errors?.lastName?.message
                          ? colors.error
                          : (value && isSubmitClicked) ? colors.primary : colors.text04
                        }`
                      }
                    ]}
                  />
                }
                InputRightElement={
                  (!errors?.lastName?.message && isSubmitClicked) && (
                    <Icon
                      as={<MaterialIcons name="check" />}
                      size={5} mr="4"
                      color={colors.primary}
                      onPress={() => setPasswordSee(!passwordSee)}
                    />
                  )
                }
                _focus={{
                  borderColor: !errors?.lastName?.message ? colors.primary : colors.error
                }}
              />
            )}
            rules={{
              required: { value: true, message: 'The field last name is required' },
            }}
          />
          {errors?.lastName?.message && (
            <View style={styles.errorTextWrapper}>
              <MaterialIcons name='warning' color={colors.error} />
              <HText style={styles.errorText}>{errors?.lastName?.message}</HText>
            </View>
          )}
        </FormControl>
        <FormControl mb={8}>
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
                returnKeyType='done'
                isDisabled={isLoading}
                value={value}
                onChangeText={val => onChange(val)}
                ref={phonenumberRef}
                blurOnSubmit={false}
                onSubmitEditing={() => Keyboard.dismiss()}
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
              minLength: { value: 10, message: 'Phone number must contain 10 digits' },
            }}
          />
          {errors?.phonenumber?.message && (
            <View style={styles.errorTextWrapper}>
              <MaterialIcons name='warning' color={colors.error} />
              <HText style={styles.errorText}>{errors?.phonenumber?.message}</HText>
            </View>
          )}
        </FormControl>
        
        <FormControl mb={6}>
          <Controller
            name='agree'
            control={control}
            render={({ field: { onChange, value } }) => (
              <HStack>
                <Checkbox
                  size='lg'
                  borderColor={colors.primary}
                  _checked={{
                    backgroundColor: colors.primary,
                    borderColor: colors.primary
                  }}
                  _interactionBox={{
                    opacity: 0
                  }}
                  isChecked={value}
                  onChange={selected => onChange(selected)}
                />
                <HText style={styles.checkboxText}>
                  I agree to the <HText style={styles.underlineText}>Honely Privacy Policy, Terms of Usage, Disclaimer and Licensing Agreement.</HText>
                </HText>
              </HStack>
            )}
            rules={{
              required: { value: true, message: 'The agreement is required' }
            }}
          />
          {errors?.agree?.message && (
            <View style={styles.errorTextWrapper}>
              <MaterialIcons name='warning' color={colors.error} />
              <HText style={styles.errorText}>{errors?.agree?.message}</HText>
            </View>
          )}
        </FormControl>
        <HStack>
          <Checkbox
            size='lg'
            borderColor={colors.primary}
            _checked={{
              backgroundColor: colors.primary,
              borderColor: colors.primary
            }}
            _interactionBox={{
              opacity: 0
            }}
            isChecked={formState?.emailConsent || false}
            onChange={selected => setFormState({ ...formState, emailConsent: selected })}
          />
          <HText style={styles.checkboxText}>
            I consent to receive Honely newsletters and promotional content via email. For further information, please consult the Privacy Policy.
          </HText>
        </HStack>
      </View>
      <Box alignItems='center' mt='8' mb='6'>
        <HButton
          text='Sign Up'
          onPress={handleSubmitClick}
          isLoading={isLoading}
        />
      </Box>
    </ScrollView>
  )
}

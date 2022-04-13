import React, { useState, useRef, useEffect } from 'react'
import { View, Image, ScrollView, Keyboard } from 'react-native'
import { Box, Input, FormControl, Pressable, useToast, Icon, Button } from 'native-base'
import { useForm, Controller } from 'react-hook-form'
import { HText, HScreenHeader, HButton } from '../Shared'
import { icons, colors } from '../../utils/styleGuide'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { launchImageLibrary } from 'react-native-image-picker'
import { TOAST_LENGTH_SHORT } from '../../config'
import styles from './style'

import { useDispatch, useSelector } from 'react-redux'
import { setFormState, doUpdateProfile } from './store'

export const EditProfile = (props) => {
  const {
    navigation,
  } = props

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const { isLoading, formState } = useSelector(({ screens }) => screens.editprofile)

  const toast = useToast()
  const [isSubmitClicked, setIsSubmitClicked] = useState(false)
  const { control, handleSubmit, formState: { errors, isValid }, setValue } = useForm({
    defaultValues: formState
  })

  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const phoneNumberRef = useRef()
  const companyNameRef = useRef()
  const emailRef = useRef()

  const handleChangeInputEmail = (value, onChange) => {
    onChange(value.toLowerCase().replace(/[&,()%";:ç?<>{}\\[\]\s]/g, ''))
  }

  const onSubmit = async (values) => {
    Keyboard.dismiss()
    // dispatch(setFormState(values))
    // try {
    //   const response = await dispatch(doUpdateProfile())
    //   if (response.result === 'Success') {
    //     toast.show({
    //       title: 'Success',
    //       description: 'Profile updated',
    //       status: 'success',
    //       duration: TOAST_LENGTH_SHORT,
    //       marginRight: 4,
    //       marginLeft: 4,
    //     })
    //   }
    // } catch (error) {
    //   toast.show({
    //     title: 'Error',
    //     description: error,
    //     status: 'error',
    //     duration: TOAST_LENGTH_SHORT,
    //     marginRight: 4,
    //     marginLeft: 4,
    //   })
    // }
  }

  const handleSubmitClick = () => {
    !isSubmitClicked && setIsSubmitClicked(true)
    handleSubmit(onSubmit)()
  }

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo', maxHeight: 200, maxWidth: 200, includeBase64: true }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
        toast.show({
          title: 'Error',
          description: response.errorMessage,
          status: 'error',
          duration: TOAST_LENGTH_SHORT,
          marginRight: 4,
          marginLeft: 4,
        })
      } else {
        if (response?.assets) {
          const userPhoto = `data:${response.assets[0].type};base64,${response.assets[0].base64}`
          dispatch(setFormState({ image_url: userPhoto }))
        } else {
          toast.show({
            title: 'Error',
            description: 'Image not found',
            status: 'error',
            duration: TOAST_LENGTH_SHORT,
            marginRight: 4,
            marginLeft: 4,
          })
        }
      }
    })
  }

  useEffect(() => {
    const fetchImage = () => {
      const defaultImg = 'https://honely-files-public.s3.amazonaws.com/images/avatar/avatar_user_01.png'
      if (currentUser?.image_url) {
        return currentUser.image_url
      } else {
        return defaultImg
      }
    }
    const initialFormState = {
      user_name: currentUser.user_name,
      user_type: currentUser.user_type,
      first_name: currentUser.first_name,
      last_name: currentUser.last_name,
      phone_number: currentUser.phone_number,
      email: currentUser.email,
      image_url: fetchImage()
    }
    setValue('user_name', initialFormState.user_name)
    setValue('first_name', initialFormState.first_name)
    setValue('last_name', initialFormState.last_name)
    setValue('phone_number', initialFormState.phone_number)
    setValue('email', initialFormState.email)
    setValue('image_url', initialFormState.image_url)

    dispatch(setFormState(initialFormState))
  }, [])

  return (
    <View style={styles.wrapper}>
      <HScreenHeader
        title='Edit Profile'
        onPress={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        <HText style={styles.title}>Account Information</HText>
        <View style={styles.photoWrapper}>
          <Image
            source={{ uri: formState.image_url }}
            style={styles.userPhoto}
          />
          <Pressable
            onPress={handleImagePicker}
            style={styles.photoEditBtn}
            _pressed={{
              opacity: 0.6
            }}
          >
            <Image
              source={icons.edit}
              style={styles.editIcon}
            />
          </Pressable>
        </View>
        <Box mt='6'>
          <FormControl mb={4}>
            <FormControl.Label _text={styles.label} mb={1}>Username</FormControl.Label>
            <Controller
              name='user_name'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='Enter your username'
                  placeholderTextColor={colors.text03}
                  color={colors.text01}
                  fontWeight='500'
                  fontSize={14}
                  borderRadius={8}
                  height={55}
                  borderColor={
                    errors?.user_name?.message ? colors.error : colors.primary
                  }
                  autoCapitalize='none'
                  autoCorrect={false}
                  returnKeyType='next'
                  isDisabled
                  value={value}
                  onChangeText={val => onChange(val)}
                  onSubmitEditing={() => emailRef.current?.focus()}
                  blurOnSubmit={false}
                  InputLeftElement={
                    <Image
                      source={icons.user}
                      style={[
                        styles.inputIcon,
                        {tintColor: `${
                          errors?.user_name?.message
                            ? colors.error : colors.primary
                          }`
                        }
                      ]}
                    />
                  }
                  InputRightElement={
                    (!errors?.user_name?.message && isSubmitClicked) && (
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
            />
            {errors?.user_name?.message && (
              <View style={styles.errorTextWrapper}>
                <MaterialIcons name='warning' color={colors.error} />
                <HText style={styles.errorText}>{errors?.user_name?.message}</HText>
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
                  color={colors.text01}
                  keyboardType="email-address"
                  fontWeight='500'
                  fontSize={14}
                  borderRadius={8}
                  height={55}
                  borderColor={
                    errors?.email?.message ? colors.error : colors.primary
                  }
                  autoCapitalize='none'
                  autoCorrect={false}
                  autoCompleteType='email'
                  returnKeyType='done'
                  ref={emailRef}
                  isDisabled
                  value={value}
                  onChangeText={val => handleChangeInputEmail(val, onChange)}
                  onSubmitEditing={() => firstNameRef.current?.focus()}
                  blurOnSubmit={false}
                  InputLeftElement={
                    <Image
                      source={icons.email}
                      style={[
                        styles.inputIcon,
                        {tintColor: `${
                          errors?.email?.message
                            ? colors.error : colors.primary
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
          <FormControl mb={4}>
            <FormControl.Label _text={styles.label} mb={1}>First Name</FormControl.Label>
            <Controller
              name='first_name'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='First Name'
                  placeholderTextColor={colors.text03}
                  color={colors.text01}
                  fontSize={14}
                  borderRadius={8}
                  height={55}
                  fontWeight='500'
                  borderColor={
                    errors?.first_name?.message ? colors.error : colors.primary
                  }
                  autoCapitalize='none'
                  autoCorrect={false}
                  returnKeyType='next'
                  isDisabled={isLoading}
                  ref={firstNameRef}
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
                          errors?.first_name?.message
                            ? colors.error : colors.primary
                          }`
                        }
                      ]}
                    />
                  }
                  InputRightElement={
                    (!errors?.first_name?.message && isSubmitClicked) && (
                      <Icon
                        as={<MaterialIcons name="check" />}
                        size={5} mr="4"
                        color={colors.primary}
                      />
                    )
                  }
                  _focus={{
                    borderColor: !errors?.first_name?.message ? colors.primary : colors.error
                  }}
                />
              )}
              rules={{
                required: { value: true, message: 'The field first name is required' },
              }}
            />
            {errors?.first_name?.message && (
              <View style={styles.errorTextWrapper}>
                <MaterialIcons name='warning' color={colors.error} />
                <HText style={styles.errorText}>{errors?.first_name?.message}</HText>
              </View>
            )}
          </FormControl>
          <FormControl mb={4}>
            <FormControl.Label _text={styles.label} mb={1}>Last Name</FormControl.Label>
            <Controller
              name='last_name'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='Last Name'
                  placeholderTextColor={colors.text03}
                  color={colors.text01}
                  fontWeight='500'
                  fontSize={14}
                  borderRadius={8}
                  height={55}
                  borderColor={
                    errors?.last_name?.message ? colors.error : colors.primary
                  }
                  autoCapitalize='none'
                  autoCorrect={false}
                  returnKeyType='next'
                  isDisabled={isLoading}
                  ref={lastNameRef}
                  value={value}
                  onChangeText={val => onChange(val)}
                  blurOnSubmit={false}
                  onSubmitEditing={() => phoneNumberRef.current?.focus()}
                  InputLeftElement={
                    <Image
                      source={icons.user}
                      style={[
                        styles.inputIcon,
                        {tintColor: `${
                          errors?.last_name?.message
                            ? colors.error : colors.primary
                          }`
                        }
                      ]}
                    />
                  }
                  InputRightElement={
                    (!errors?.last_name?.message && isSubmitClicked) && (
                      <Icon
                        as={<MaterialIcons name="check" />}
                        size={5} mr="4"
                        color={colors.primary}
                      />
                    )
                  }
                  _focus={{
                    borderColor: !errors?.last_name?.message ? colors.primary : colors.error
                  }}
                />
              )}
              rules={{
                required: { value: true, message: 'The field last name is required' },
              }}
            />
            {errors?.last_name?.message && (
              <View style={styles.errorTextWrapper}>
                <MaterialIcons name='warning' color={colors.error} />
                <HText style={styles.errorText}>{errors?.last_name?.message}</HText>
              </View>
            )}
          </FormControl>
          <FormControl mb={4}>
            <FormControl.Label _text={styles.label} mb={1}>Phone number</FormControl.Label>
            <Controller
              name='phone_number'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='e.g +1 234 2892 2892'
                  placeholderTextColor={colors.text03}
                  color={colors.text01}
                  keyboardType="number-pad"
                  fontWeight='500'
                  fontSize={14}
                  borderRadius={8}
                  height={55}
                  borderColor={
                    errors?.phone_number?.message ? colors.error : colors.primary
                  }
                  autoCapitalize='none'
                  autoCorrect={false}
                  returnKeyType='next'
                  isDisabled={isLoading}
                  value={value}
                  onChangeText={val => onChange(val)}
                  ref={phoneNumberRef}
                  blurOnSubmit={false}
                  onSubmitEditing={() => companyNameRef.current?.focus()}
                  InputLeftElement={
                    <Image
                      source={icons.phone}
                      style={[
                        styles.inputIcon,
                        {tintColor: `${
                          errors?.phone_number?.message
                            ? colors.error : colors.primary
                          }`
                        }
                      ]}
                    />
                  }
                  InputRightElement={
                    (!errors?.phone_number?.message && isSubmitClicked) && (
                      <Icon
                        as={<MaterialIcons name="check" />}
                        size={5} mr="4"
                        color={colors.primary}
                        onPress={() => setPasswordSee(!passwordSee)}
                      />
                    )
                  }
                  _focus={{
                    borderColor: !errors?.phone_number?.message ? colors.primary : colors.error
                  }}
                />
              )}
              rules={{
                required: { value: true, message: 'The field phone number is required' },
                // minLength: { value: 10, message: 'Phone number must contain 10 digits' },
              }}
            />
            {errors?.phone_number?.message && (
              <View style={styles.errorTextWrapper}>
                <MaterialIcons name='warning' color={colors.error} />
                <HText style={styles.errorText}>{errors?.phone_number?.message}</HText>
              </View>
            )}
          </FormControl>
          <FormControl>
            <FormControl.Label _text={styles.label} mb={1}>Company name</FormControl.Label>
            <Controller
              name='company_name'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='e.g Keller Willaims Realty'
                  placeholderTextColor={colors.text03}
                  color={colors.text01}
                  fontSize={14}
                  borderRadius={8}
                  fontWeight='500'
                  height={55}
                  borderColor={
                    errors?.company_name?.message ? colors.error : colors.primary
                  }
                  autoCapitalize='none'
                  autoCorrect={false}
                  returnKeyType='next'
                  isDisabled={isLoading}
                  ref={companyNameRef}
                  value={value}
                  onChangeText={val => onChange(val)}
                  blurOnSubmit
                  onSubmitEditing={() => handleSubmitClick()}
                  InputLeftElement={
                    <Image
                      source={icons.company}
                      style={[
                        styles.inputIcon,
                        {tintColor: `${
                          errors?.company_name?.message
                            ? colors.error : colors.primary
                          }`
                        }
                      ]}
                    />
                  }
                  InputRightElement={
                    (!errors?.company_name?.message && isSubmitClicked) && (
                      <Icon
                        as={<MaterialIcons name="check" />}
                        size={5} mr="4"
                        color={colors.primary}
                      />
                    )
                  }
                  _focus={{
                    borderColor: !errors?.company_name?.message ? colors.primary : colors.error
                  }}
                  defaultValue=''
                />
              )}
              // rules={{
              //   required: { value: true, message: 'The company name is required' },
              // }}
            />
            {errors?.company_name?.message && (
              <View style={styles.errorTextWrapper}>
                <MaterialIcons name='warning' color={colors.error} />
                <HText style={styles.errorText}>{errors?.company_name?.message}</HText>
              </View>
            )}
          </FormControl>
        </Box>

        <Box alignItems='center' mt='8' mb='8'>
          <HButton
            text='Save Changes'
            onPress={handleSubmitClick}
            isLoading={isLoading}
          />
        </Box>
      </ScrollView>
    </View>
  )
}

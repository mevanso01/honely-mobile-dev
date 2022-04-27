import React, { useState, useEffect, useRef } from 'react'
import { View, ScrollView, Image, Platform, TouchableWithoutFeedback, Keyboard, Animated } from 'react-native'
import { Input, Pressable, HStack, useToast, Spinner } from 'native-base'
import { HText } from '../Shared'
import { ScrollView as DropDownContainer } from 'react-native-gesture-handler'
import { colors, icons } from '../../utils/styleGuide'
import styles from './style'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FeatherIcons from 'react-native-vector-icons/Feather'
import { doGet } from '../../services/http-client'
import { TOAST_LENGTH_SHORT } from '../../config'

export const FindLeads = (props) => {
  const {
    onNavigationRedirect
  } = props

  const toast = useToast()
  const insets = useSafeAreaInsets()
  const statusBarHeight = insets.top
  const [searchValue, setSearchValue] = useState('')
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [isShowHint, setIsShowHint] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [suggestionList, setSuggestionList] = useState(null)

  let timeout = null
  let transformY = useRef(new Animated.Value(0)).current
  const animatedY = transformY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50]
  })

  const handleBackgoundClick = () => {
    Keyboard.dismiss()
    setIsOpenDropdown(false)
    transformY.stopAnimation()
    setIsShowHint(false)
  }

  const onChangeSearch = (value) => {
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      setSearchValue(value)
      if (value) {
        handleGetSuggestionAddress(value)
      } else {
        setIsOpenDropdown(false)
      }
    }, 750)
  }

  const handleSelectZipcode = () => {
    setIsOpenDropdown(false)
    onNavigationRedirect('LeadsMap')
  }

  const handleSearchFocus = () => {
    setIsShowHint(false)
    if (suggestionList && searchValue) {
      setIsOpenDropdown(true)
    }
  }
  
  const getFullAddressText = (address) => {
    let text = ''
    const level = suggestionList?.data?.level
    if (level === 'zipcode') {
      text += address?.zip_code + ' '
      if (address?.city) {
        text += address.city + ', '
      }
      text += address?.state
    }
    if (level === 'city') {
      if (address?.city) {
        text += address.city + ', '
      }
      text += address?.state
    }
    if (level === 'state') {
      text += address?.state_short
    }
    return text
  }

  const handleGetSuggestionAddress = async (address) => {
    try {
      setIsLoading(true)
      const response = await doGet('searches/lead/address-suggestions', { address: address, limit: 5 })
      setSuggestionList(response)
      setIsOpenDropdown(true)
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

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(transformY, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(transformY, { toValue: 0, duration: 1000, useNativeDriver: true })
      ])
    ).start()
  }, [])

  return (
    <TouchableWithoutFeedback
      onPress={() => handleBackgoundClick()}
    >
      <View style={styles.screenContainer}>
        <View style={[
          styles.headerContainer,
          { paddingTop: Platform.OS === 'ios' ? statusBarHeight : 40, }
        ]}>
          <HText style={styles.title}>Find Leads</HText>
        </View>
        <View style={styles.searchBoxWrapper}>
          <Input
            placeholder='Enter City, or Zip Code'
            placeholderTextColor={colors.primary}
            backgroundColor={colors.white}
            fontSize={27}
            height={60}
            borderRadius={30}
            paddingRight={17}
            zIndex={1100}
            color={colors.primary}
            borderColor={isOpenDropdown ? colors.white : colors.primary}
            autoCapitalize='none'
            returnKeyType='done'
            blurOnSubmit
            onChangeText={val => onChangeSearch(val)}
            _focus={{
              borderColor: isOpenDropdown ? colors.white : colors.primary
            }}
            onFocus={() => handleSearchFocus()}
            InputLeftElement={
              <Image
                source={icons.location}
                style={styles.zipIcon}
              />
            }
            InputRightElement={
              isLoading && <Spinner color={colors.primary} size='lg' mr='4' ml='4' />
            }
          />
          {isOpenDropdown && suggestionList && (
            <View style={styles.searchListContainer}>
              <DropDownContainer
                showsVerticalScrollIndicator={false}
                style={styles.dropDownContainer}
                contentContainerStyle={styles.dropDownContent}
              >
                {suggestionList?.result === 'Error' ? (
                  <HText style={styles.noSuggestionText}>{suggestionList?.message}</HText>
                ) : (
                  <>
                    {suggestionList?.data?.addresses.map((address, i) => (
                      <Pressable
                        key={i}
                        _pressed={{
                          backgroundColor: colors.text05
                        }}
                        onPress={() => handleSelectZipcode()}
                      >
                        <HilightTextConvert
                          text={getFullAddressText(address)}
                          highlight={searchValue}
                        />
                      </Pressable>
                    ))}
                  </>
                )}
              </DropDownContainer>
            </View>
          )}
          {isShowHint && (
            <>
              <View style={[styles.backDrop, { top: Platform.OS === 'ios' ? -(53 + statusBarHeight) : -93 }]} />
              <Animated.View
                style={[
                  styles.hintContainer,
                  { transform: [{ translateY: animatedY }] }
                ]}
              >
                <Image source={icons.hintArrowUp} style={styles.hintArrow} />
                <HText style={styles.hintText}>Search by zip code to find leads.</HText>
              </Animated.View>
            </>
          )}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View style={styles.recentSearchContainer}>
            <HText style={styles.recentText}>Recent Searches</HText>
            {[...Array(3).keys()].map(i => (
              <Pressable
                key={i}
                mb='3'
                _pressed={{
                  backgroundColor: colors.text05
                }}
                onPress={() => handleSelectZipcode()}
              >
                <View style={styles.recentSearchItem}>
                  <HText style={styles.searchsuggestionText}>Los Angeles, CA</HText>
                  <HStack mt='2' alignItems='center' justifyContent='space-between'>
                    <HText style={styles.searchLeadsText}>(33 leads unclaimed)</HText>
                    <FeatherIcons name='arrow-right' size={20} color={colors.primary} />
                  </HStack>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  )
}

const HilightTextConvert = (props) => {
  const {
    text,
    highlight
  } = props
  
  let startIndex = text.toLowerCase().indexOf(highlight.toLowerCase());
  let endIndex = text.toLowerCase().indexOf(highlight.toLowerCase()) + highlight.length;
  if (startIndex !== -1) {
    return (
      <HText style={styles.paragraph}>
        {text.substring(0, startIndex)}
        <HText style={{ ...styles.paragraph, ...styles.highlight }}>
          {text.substring(startIndex, endIndex)}
        </HText>
        {text.substring(endIndex, text.length)}
      </HText>
    )
  } else {
    return <HText style={styles.paragraph}>{text}</HText>
  }
}

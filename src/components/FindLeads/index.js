import React, { useState, useEffect, useRef } from 'react'
import { View, ScrollView, Image, Platform, TouchableWithoutFeedback, Keyboard, Animated } from 'react-native'
import { Input, Pressable } from 'native-base'
import { HText } from '../Shared'
import { ScrollView as DropDownContainer } from 'react-native-gesture-handler'
import { colors, icons } from '../../utils/styleGuide'
import styles from './style'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const FindLeads = (props) => {
  const insets = useSafeAreaInsets()
  const statusBarHeight = insets.top
  const [searchValue, setSearchValue] = useState('')
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [isShowHint, setIsShowHint] = useState(true)
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
    }, 750)
  }

  useEffect(() => {
    if (searchValue) {
      setIsOpenDropdown(true)
    } else {
      setIsOpenDropdown(false)
    }
  }, [searchValue])

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
            borderColor={colors.primary}
            borderWidth={isOpenDropdown ? 0 : 1}
            autoCapitalize='none'
            returnKeyType='done'
            blurOnSubmit
            // value={searchValue}
            onChangeText={val => onChangeSearch(val)}
            _focus={{
              borderColor: colors.primary
            }}
            InputLeftElement={
              <Image
                source={icons.location}
                style={styles.zipIcon}
              />
            }
          />
          {isOpenDropdown && (
            <View style={styles.searchListContainer}>
              <DropDownContainer
                showsVerticalScrollIndicator={false}
                style={styles.dropDownContainer}
                contentContainerStyle={styles.dropDownContent}
              >
                {[...Array(10).keys()].map(i => (
                  <Pressable
                    key={i}
                    _pressed={{
                      backgroundColor: colors.text05
                    }}
                    onPress={() => setIsOpenDropdown(false)}
                  >
                    <HText style={styles.searchText}>{2643 + i}</HText>
                  </Pressable>
                ))}
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
            <View style={styles.recentSearchItem}>
              <HText style={styles.searchAddressText}>Los Angeles, CA</HText>
              <HText style={styles.searchLeadsText}>(33 leads unclaimed)</HText>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  )
}

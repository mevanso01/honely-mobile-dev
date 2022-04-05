import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image } from 'react-native'
import { Input, Pressable } from 'native-base'
import { HText } from '../Shared'
import { ScrollView as DropDownContainer } from 'react-native-gesture-handler'
import { colors, icons } from '../../utils/styleGuide'
import styles from './style'

export const BuyLeads = (props) => {
  const [searchValue, setSearchValue] = useState('')
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  let timeout = null

  useEffect(() => {
    if (searchValue) {
      setIsOpenDropdown(true)
    } else {
      setIsOpenDropdown(false)
    }
  }, [searchValue])

  const onChangeSearch = (value) => {
    clearTimeout(timeout)

    timeout = setTimeout(function () {
      setSearchValue(value)
    }, 750)
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <HText style={styles.title}>Find Leads</HText>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <View style={styles.searchBoxWrapper}>
          <Input
            placeholder='Enter City, or Zip Code'
            placeholderTextColor={colors.purple}
            backgroundColor={colors.white}
            fontSize={27}
            height={60}
            borderRadius={30}
            paddingRight={17}
            color={colors.purple}
            borderColor={colors.purple}
            autoCapitalize='none'
            returnKeyType='done'
            blurOnSubmit
            // value={searchValue}
            onChangeText={val => onChangeSearch(val)}
            _focus={{
              borderColor: colors.purple
            }}
            zIndex={1001}
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
        </View>
        <View style={styles.recentSearchContainer}>
          <HText style={styles.recentText}>Recent Searches</HText>
          <View style={styles.recentSearchItem}>
            <HText style={styles.searchAddressText}>Los Angeles, CA</HText>
            <HText style={styles.searchLeadsText}>(33 leads unclaimed)</HText>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

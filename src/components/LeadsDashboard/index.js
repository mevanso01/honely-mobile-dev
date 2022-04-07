import React, { useState, useEffect } from 'react'
import { ScrollView, Image, View } from 'react-native'
import { HText, HButton } from '../Shared'
import { colors, images, icons } from '../../utils/styleGuide'
import { HStack, VStack, Box, Pressable, Checkbox, Icon } from 'native-base'
import SplashScreen from 'react-native-splash-screen'
import Swiper from 'react-native-swiper'
import styles from './style'

export const LeadsDashboard = (props) => {
  const {
    onNavigationRedirect
  } = props

  const isNoData = false

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <View style={styles.screenContainer}>
      <HText style={styles.title}>Leads Dashboard</HText>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {!isNoData ? (
          <View style={styles.leadsContent}>
            <VStack mb='12'>
              <HStack mb='4' justifyContent='space-between'>
                <HText style={styles.filterText}>Filter by:</HText>
                <HText style={styles.filterText}>32 leads</HText>
              </HStack>
              <HStack>
                <HStack alignItems='center' mr='8'>
                  <Checkbox
                    size='md'
                    borderRadius={15}
                    borderColor={colors.primary}
                    _checked={{
                      backgroundColor: colors.white,
                      borderColor: colors.primary,
                    }}
                    _interactionBox={{
                      opacity: 0
                    }}
                    icon={
                      <Icon as={<Image source={icons.cirlceCheckOn} />} />
                    }
                    accessibilityLabel='Buyers'
                  />
                  <HText style={styles.radioLabel}>Buyers</HText>
                </HStack>
                <HStack alignItems='center' mr='8'>
                  <Checkbox
                    size='md'
                    borderRadius={15}
                    borderColor={colors.primary}
                    _checked={{
                      backgroundColor: colors.white,
                      borderColor: colors.primary,
                    }}
                    _interactionBox={{
                      opacity: 0
                    }}
                    icon={
                      <Icon as={<Image source={icons.cirlceCheckOn} />} />
                    }
                  />
                  <HText style={styles.radioLabel}>Sellers</HText>
                </HStack>
                <HStack alignItems='center'>
                  <Checkbox
                    size='md'
                    borderRadius={15}
                    borderColor={colors.primary}
                    _checked={{
                      backgroundColor: colors.white,
                      borderColor: colors.primary,
                    }}
                    _interactionBox={{
                      opacity: 0
                    }}
                    icon={
                      <Icon as={<Image source={icons.cirlceCheckOn} />} />
                    }
                  />
                  <HText style={styles.radioLabel}>Prospective</HText>
                </HStack>
              </HStack>
            </VStack>
            <Swiper
              showsButtons={false}
              loop={true}
              renderPagination={renderPagination}
              height={420}
            >
              {[...Array(32).keys()].map(i => (
                <View key={i} style={styles.cardContainer}>
                  <HStack alignItems='center' borderBottomColor={colors.borderColor} borderBottomWidth='1' pb='5'>
                    <Image source={icons.location} style={styles.locationIcon}
                    />
                    <HText style={styles.locationText}>Los Angeles, CA 92131</HText>
                  </HStack>
                  <Box mt='6' mb='6'>
                    <HText style={styles.nameText}>Jonathan Shah</HText>
                  </Box>
                  <HStack justifyContent='space-between'>
                    <HText style={styles.userTypeText}>Buyer</HText>
                    <HText style={styles.userTypeText}>
                      <HText style={[styles.userTypeText, { color: colors.borderColor }]}>Status:</HText> New
                    </HText>
                  </HStack>
                  <HStack mt='6' alignItems='center'>
                    <Image source={icons.email} style={styles.infoIcon} />
                    <HText style={styles.infoText}>jonathan@mail.com</HText>
                  </HStack>
                  <HStack mt='5' alignItems='center'>
                    <Image source={icons.phone} style={styles.infoIcon} />
                    <HText style={styles.infoText}>+1 238 2838 282</HText>
                  </HStack>
                  <Box alignItems='center' mt='16'>
                    <HButton
                      text='Contact'
                      borderColor={colors.white}
                      backgroundColor={colors.white}
                      textStyle={{
                        color: colors.primary,
                        fontSize: 24,
                        fontWeight: '700'
                      }}
                      height={50}
                      width={180}
                      onPress={() => onNavigationRedirect('ContactLead')}
                    />
                  </Box>
                </View>
              ))}
            </Swiper>
          </View>
        ) : (
          <View style={styles.bottomContainer}>
            <View style={[styles.imageWrapper, { aspectRatio: 221 / 240 }]}>
              <Image
                source={images.leadsBg}
                style={styles.image}
              />
            </View>
            <HText style={styles.subtitle}>No Leads</HText>
            <HText style={styles.description}>Buy leads to see what your consumers are looking for.</HText>
            <HButton
              text='Buy Leads'
              borderColor={colors.primary}
              backgroundColor={colors.primary}
              onPress={() => {}}
            />
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const renderPagination = (index, total, context) => {
  return (
    <Box alignItems='center'>
      <HText style={styles.paginationText}>{index + 1}/{total}</HText>
    </Box>
  )
}
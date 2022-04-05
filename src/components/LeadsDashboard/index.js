import React, { useState, useEffect } from 'react'
import { ScrollView, Image, View } from 'react-native'
import { HText, HButton, HPressableText } from '../Shared'
import { colors, images, icons } from '../../utils/styleGuide'
import { HStack, VStack, Box } from 'native-base'
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
            <HStack justifyContent='space-around' mb='8'>
              <HPressableText
                text='Buyers'
                textColor={colors.gray}
                fontSize={21}
                fontWeight='400'
                onPress={() => {}}
              />
              <HPressableText
                text='Seller'
                textColor={colors.gray}
                fontSize={21}
                fontWeight='400'
                onPress={() => {}}
              />
              <HPressableText
                text='Prospective'
                textColor={colors.gray}
                fontSize={21}
                fontWeight='400'
                onPress={() => {}}
              />
            </HStack>
            <Swiper
              showsButtons={false}
              loop={true}
              renderPagination={renderPagination}
              height={410}
            >
              {[...Array(32).keys()].map(i => (
                <View key={i} style={styles.cardContainer}>
                  <HStack alignItems='center' borderBottomColor={colors.borderColor} borderBottomWidth='1' pb='5'>
                    <Image source={icons.location} style={styles.locationIcon}
                    />
                    <HText style={styles.locationText}>72839</HText>
                  </HStack>
                  <Box mt='10' mb='10' alignItems='center'>
                    <HText style={styles.nameText}>Jonathan Shah</HText>
                  </Box>
                  <HStack alignItems='center'>
                    <Image source={icons.email} style={styles.infoIcon} />
                    <HText style={styles.infoText}>jonathan@mail.com</HText>
                  </HStack>
                  <HStack mt='4' alignItems='center'>
                    <Image source={icons.phone} style={styles.infoIcon} />
                    <HText style={styles.infoText}>+1 238 2838 282</HText>
                  </HStack>
                  <Box alignItems='center' mt='16'>
                    <HButton
                      text='Contact'
                      borderColor={colors.white}
                      backgroundColor={colors.white}
                      textStyle={{
                        color: colors.purple,
                        fontSize: 24,
                        fontWeight: '700'
                      }}
                      height='50'
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
              borderColor={colors.purple}
              backgroundColor={colors.purple}
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
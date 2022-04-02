import React, { useState, useEffect } from 'react'
import { ScrollView, Image, View } from 'react-native'
import { HText, HSliderButton, HButton } from '../Shared'
import { colors, images, icons } from '../../utils/styleGuide'
import { HStack, VStack, Box, Actionsheet, useDisclose } from 'native-base'
import SplashScreen from 'react-native-splash-screen'
import styles from './style'

export const LeadsDashboard = (props) => {
  const { isOpen, onOpen, onClose } = useDisclose()
  const [isInbound, setIsInBound] = useState(true)

  const isNoData = true

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
        <HStack justifyContent='center'>
          <HSliderButton
            firstText='Inbound'
            secondText='Claimed'
            onFirstPress={() => setIsInBound(true)}
            onSecondPress={() => setIsInBound(false)}
          />
        </HStack>
        {!isNoData ? (
          <View style={styles.bottomContainer}>
            <View style={styles.shadowContainer}>
              <View style={styles.cardContainer}>
                <View style={styles.cardHeader}>
                  <HStack justifyContent='space-between'>
                    <HStack alignItems='center'>
                      <Image source={icons.location} style={styles.icon}
                      />
                      <HText style={styles.locationText}>72839</HText>
                    </HStack>
                    <HButton
                      shadow={null}
                      text='Buyer'
                      borderColor={colors.lightPrimary}
                      backgroundColor={colors.lightPrimary}
                      textStyle={{
                        color: colors.primary,
                        fontSize: 12
                      }}
                      width={67}
                      height={8}
                    />
                  </HStack>
                </View>
                <HStack mt='4'>
                  <Image source={icons.user} style={styles.infoIcon} />
                  <HText style={styles.infoText}>Jonathan Shah</HText>
                </HStack>
                <HStack mt='4'>
                  <Image source={icons.email} style={styles.infoIcon} />
                  <HText style={styles.infoText}>jonathan@mail.com</HText>
                </HStack>
                <HStack mt='4'>
                  <Image source={icons.phone} style={styles.infoIcon} />
                  <HText style={styles.infoText}>+1 238 2838 282</HText>
                </HStack>
                <Box alignItems='center' mt='8'>
                  <HButton
                    text='Claim'
                    onPress={() => onOpen()}
                  />
                </Box>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.bottomContainer}>
            <View style={[styles.imageWrapper, { aspectRatio: 255 / 265 }]}>
              <Image
                source={images.leadsBg}
                style={styles.image}
              />
            </View>
            <HText style={styles.title}>
              {isInbound ? 'No Leads' : 'No Claimed Leads'}
            </HText>
            <HText style={styles.description}>
              {isInbound ? 'Buy leads to see what your consumers are looking for.' : 'Claim any leads from the dashboard to see claimed leads over here.'}
            </HText>
            <HButton
              text='Buy Leads'
              onPress={() => {}}
            />
          </View>
        )}

        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content
            backgroundColor={colors.white}
          >
            <View style={styles.sheetContent}>
              <HText style={styles.title}>Contact Lead</HText>
              <HText style={styles.contactDescription}>
                Do you want to use one of your messages to contact the leads?
              </HText>
              <VStack alignItems='center' mt='7'>
                <HButton
                  text='Yes'
                  onPress={() => {}}
                />
                <HButton
                  text='No'
                  marginTop='2'
                  shadow={null}
                  borderColor={colors.white}
                  backgroundColor={colors.white}
                  textStyle={{
                    color: colors.text02
                  }}
                  onPress={() => {}}
                />
              </VStack>
            </View>
          </Actionsheet.Content>
        </Actionsheet>
      </ScrollView>
    </View>
  )
}
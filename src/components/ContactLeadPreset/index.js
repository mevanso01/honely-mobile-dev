import React, { useState } from 'react'
import { ScrollView, View, Image } from 'react-native'
import { Pressable, HStack, VStack, Box } from 'native-base'
import { HText, HSwitch, HSliderButton } from '../Shared'
import { icons, colors, images } from '../../utils/styleGuide'
import { Accordion } from './Accordion'
import styles from './style'

export const ContactLeadPreset = (props) => {
  const {
    navigation
  } = props

  const [phoneEnabled, setPhoneEnabled] = useState(true)
  const [emailEnabled, setEmailEnabled] = useState(true)

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => navigation.goBack()}
          _pressed={{ opacity: 0.7 }}
        >
          <HStack alignItems='center'>
            <Image source={icons.arrowLeft} style={styles.backIcon} />
            <HText>Back</HText>
          </HStack>
        </Pressable>
      </View>
      <HText style={styles.headerTitle}>Contact Lead Preset</HText>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoContainer}>
          <HText style={styles.questionText}>Is this the phone number or email you are reaching out with?</HText>
          <View style={styles.shadowContainer}>
            <View style={styles.contactCardContainer}>
              <View style={styles.contactCardInnerContainer}>
                <HStack>
                  <Image source={images.dummyAvatar} style={styles.photo} />
                  <VStack ml='2' flex='1'>
                    <HText style={styles.infoText}>Name Lastname</HText>
                    <HStack mt='3'>
                      <VStack flex='1'>
                        <HText style={styles.infoDescription}>Use my phone number to contact any lead</HText>
                        <HText style={styles.infoText}>+1 954 237 726</HText>
                        <Box mt='4'>
                          <HText style={styles.infoDescription}>Use my email to contact any lead</HText>
                          <HText style={styles.infoText}>jeffjeff@mail.com</HText>
                        </Box>
                      </VStack>
                      <VStack ml='2' justifyContent='space-between'>
                        <HSwitch
                          value={phoneEnabled}
                          onValueChange={val => setPhoneEnabled(val)}
                        />
                        <HSwitch
                          value={emailEnabled}
                          onValueChange={val => setEmailEnabled(val)}
                        />
                      </VStack>
                    </HStack>
                  </VStack>
                </HStack>
              </View>
            </View>
          </View>
          <Box mt='8'>
            <HSliderButton
              width={310}
              firstText='Buyer'
              secondText='Seller'
              onFirstPress={() => {}}
              onSecondPress={() => {}}
            />
          </Box>
        </View>

        <VStack mt='6'>
          <Accordion title='First message' />
          <Accordion title='Follow-up message' />
        </VStack>
      </ScrollView>
    </View>
  )
}

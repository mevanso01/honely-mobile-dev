import React, { useState } from 'react'
import { View, Image, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import { HStack, Box, VStack, TextArea } from 'native-base'
import { HText, HScreenHeader, HButton } from '../Shared'
import { Switch } from 'react-native-switch'
import styles from './style'
import { colors, images } from '../../utils/styleGuide'

export const ContactLead = (props) => {
  const {
    navigation
  } = props

  const [enabled, setEnabled] = useState(false)
  const [isFocus, setIsFocus] = useState(false)

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View style={styles.screenContainer}>
        <View style={styles.headerContainer}>
          <HScreenHeader
            title='Contact Lead'
            onPress={() => navigation.goBack()}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <Box>
            <View style={styles.shadowContainer}>
              <View style={styles.contactCardContainer}>
                <View style={styles.contactCardInnerContainer}>
                  <HStack>
                    <Image
                      source={images.dummyAvatar}
                      style={styles.photoWrapper}
                    />
                    <Box mr='2' ml='2' flex='1'>
                      <HText style={styles.phoneNumberText}>+1 954 237 726</HText>
                      <HText style={styles.contactDescription}>Honely would send a text message using this number</HText>
                    </Box>
                    <View style={styles.switchContainer}>
                      <Switch
                        value={enabled}
                        onValueChange={val => setEnabled(val)}
                        circleSize={30}
                        barHeight={32}
                        circleBorderWidth={2}
                        circleBorderActiveColor={colors.primary}
                        circleBorderInactiveColor={colors.gray}
                        backgroundActive={colors.primary}
                        backgroundInactive={colors.gray}
                        circleActiveColor={colors.white}
                        circleInActiveColor={colors.white}
                        changeValueImmediately={true}
                        innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
                        renderActiveText={false}
                        renderInActiveText={false}
                        switchLeftPx={3}
                        switchRightPx={3}
                        switchWidthMultiplier={1.7}
                        switchBorderRadius={30}
                      />
                    </View>
                  </HStack>
                </View>
              </View>
            </View>

            <VStack mt='6'>
              <HText style={styles.label}>Buyers preset message</HText>
              <View
                style={[styles.textArearWrapper, { borderColor: isFocus ? colors.primary : colors.borderColor }]}
              >
                <TextArea
                  fontSize={14}
                  borderRadius={8}
                  borderWidth={0}
                  height={120}
                  padding='4'
                  color={colors.text01}
                  autoCapitalize='none'
                  onChangeText={e => console.log(e)}
                  blurOnSubmit={false}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                />
              </View>
            </VStack>
          </Box>
          <Box alignItems='center' mt='8' mb='10'>
            <HButton
              text='Send Message'
              borderColor={colors.primary}
              height={50}
              backgroundColor={colors.primary}
              onPress={() => {}}
            />
          </Box>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  )
}

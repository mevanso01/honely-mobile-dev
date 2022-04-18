import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  View,
  LayoutAnimation,
  UIManager,
  Platform,
  Image
} from "react-native";
import { Pressable, TextArea, VStack, Divider, Box } from 'native-base'
import { HText, HButton } from '../Shared'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors, icons } from '../../utils/styleGuide'
import styles from './style'

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const Accordion = (props) => {
  const {
    title,
    isLoading,
    isUpdating,
    emailText,
    smsText,
    handleChangeEmailText,
    handleChangeSmsText,
    onSave
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const [isSmsFocus, setIsSmsFocus] = useState(false)
  const [isEmailFocus, setIsEmailFocus] = useState(false)

  let transformX = useRef(new Animated.Value(0)).current
  const arrowRotation = transformX.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg']
  })

  useEffect(() => {
    if (isOpen) {
      Animated.timing(transformX, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start()
    } else {
      Animated.timing(transformX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start()
    }
  }, [isOpen])

  const toggleOpen = () => {
    setIsOpen(value => !value);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  return (
    <>
      <Pressable
        _pressed={{
          backgroundColor: colors.text05
        }}
        onPress={() => toggleOpen()}
      >
        <View style={styles.accordionHeader}>
          {!isOpen ? (
            <MaterialIcons name='check-circle' size={16} color={colors.primary} />
          ) : (
            <MaterialIcons name='radio-button-unchecked' size={16} color={colors.primary} />
          )}
          <HText style={styles.accordionHeaderText}>{title}</HText>
          <Animated.View
            style={{
              transform: [{ rotate: arrowRotation }]
            }}
          >
            <Image source={icons.arrowRight} style={styles.arrowRight} />
          </Animated.View>
        </View>
      </Pressable>
      <View style={[styles.list, !isOpen ? styles.hidden : undefined]}>
        <VStack>
          <HText style={styles.textAreaLabel}>Email</HText>
          <View
            style={[styles.textArearWrapper, { borderColor: isEmailFocus ? colors.primary : colors.borderColor }]}
          >
            <TextArea
              placeholder='Write your first email preset message here.'
              fontSize={16}
              borderRadius={8}
              borderWidth={0}
              height={120}
              padding='4'
              color={colors.text01}
              autoCapitalize='none'
              defaultValue={emailText || ''}
              isDisabled={isLoading || isUpdating}
              onChangeText={e => handleChangeEmailText(e)}
              blurOnSubmit={false}
              onFocus={() => setIsEmailFocus(true)}
              onBlur={() => setIsEmailFocus(false)}
            />
          </View>
        </VStack>
        <VStack mt='4'>
          <HText style={styles.textAreaLabel}>SMS</HText>
          <View
            style={[styles.textArearWrapper, { borderColor: isSmsFocus ? colors.primary : colors.borderColor }]}
          >
            <TextArea
              placeholder='Write you preset message here'
              fontSize={16}
              borderRadius={8}
              borderWidth={0}
              height={120}
              padding='4'
              color={colors.text01}
              autoCapitalize='none'
              defaultValue={smsText || ''}
              isDisabled={isLoading || isUpdating}
              onChangeText={e => handleChangeSmsText(e)}
              blurOnSubmit={false}
              onFocus={() => setIsSmsFocus(true)}
              onBlur={() => setIsSmsFocus(false)}
            />
          </View>
        </VStack>
        <Box alignItems='center' my='8'>
          <HButton
            text='Save'
            isLoading={isUpdating}
            onPress={onSave}
          />
        </Box>
      </View>
      <Divider backgroundColor={colors.borderColor} />
    </>
  );
};

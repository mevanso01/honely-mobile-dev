import React, { useState, useEffect, useRef } from 'react'
import { View, Animated, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '../../utils/styleGuide'
import HText from './HText'

const HSliderButton = (props) => {
  const {
    isForceActive,
    firstText,
    secondText,
    onFirstPress,
    onSecondPress
  } = props

  const totalWidth = props.width || 240

  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      position: 'relative',
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.lightGray,
      marginHorizontal: 5,
      width: totalWidth,
      alignSelf: 'center'
    },
    textWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textStyle: {
      fontSize: 18,
    }
  })

  const [active, setActive] = useState(isForceActive || false)
  let transformX = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (active) {
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
  }, [active])

  const rotationX = transformX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, totalWidth / 2]
  })

  useEffect(() => {
    setActive(isForceActive)
  }, [isForceActive])

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={{
          position: 'absolute',
          height: 50,
          top: 0,
          borderRadius: 25,
          width: totalWidth / 2,
          transform: [
            {
              translateX: rotationX
            }
          ],
          backgroundColor: colors.primary,
        }}
      >
      </Animated.View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.textWrapper}
        onPress={() => {
          onFirstPress && onFirstPress()
          setActive(false)
        }}
      >
        <HText
          style={[
            styles.textStyle,
            {
              color: !active ? colors.white : colors.text03,
              fontWeight: active ? '400': '700'
            }
          ]}
        >
          {firstText}
        </HText>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.textWrapper}
        onPress={() => {
          onSecondPress && onSecondPress()
          setActive(true)
        }}
      >
        <HText
          style={[
            styles.textStyle,
            {
              color: active ? colors.white : colors.text03,
              fontWeight: active ? '700': '400'
            }
          ]}
        >
          {secondText}
        </HText>
      </TouchableOpacity>
    </View>
  )
}

export default HSliderButton

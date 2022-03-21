import React from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { View, Image, StyleSheet } from 'react-native'
import { colors, icons } from '../../utils/styleGuide'

const HCricleProgress = (props) => {
  const {
    isShowChecked
  } = props

  const styles = StyleSheet.create({
    checkIcon: {
      width: 11,
      height: 8
    }
  })

  return (
    <AnimatedCircularProgress
      size={props.size || 52}
      width={props.width || 5}
      fill={props.fill || 33}
      tintColor={props.tintColor || colors.primary}
      rotation={props.rotation || 0}
      lineCap={props.lineCap || 'round'}
      // onAnimationComplete={() => console.log('onAnimationComplete')}
      backgroundWidth={props.backgroundWidth || 3}
      backgroundColor={props.backgroundColor || colors.borderColor}
      duration={props.duration || 500}
    >
      {
        (fill) => (
          isShowChecked ? (
            <Image
              source={icons.check}
              style={styles.checkIcon}
            />
          ) : null
        )
      }
    </AnimatedCircularProgress>
  )
}
export default HCricleProgress

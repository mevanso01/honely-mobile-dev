import React from 'react'
import { Pressable } from 'native-base'
import { colors } from '../../utils/styleGuide'
import HText from './HText'

const HPressableText = (props) => {
  const {
    text,
    textStyle
  } = props
  return (
    <Pressable
      onPress={props.onPress}
      _pressed={{
        opacity: 0.6
      }}
    >
      <HText
        style={{
          color: props.textColor || colors.primary,
          fontSize: props.fontSize || 16,
          fontWeight: props.fontWeight || '500',
          ...textStyle
        }}
      >
        {text}
      </HText>
    </Pressable>
  )
}

export default HPressableText
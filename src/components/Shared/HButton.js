import * as React from 'react';
import { Button } from 'native-base'
import { darken } from 'polished'
import { colors } from '../../utils/styleGuide'

const HButton = (props) => {
  const {
    text,
    backgroundColor,
    textStyle
  } = props

  return (
    <Button
      onPress={props.onPress}
      shadow={props.shadow || 3}
      width={props.width || 180}
      height={props.height || 50}
      borderRadius={props.borderRadius || 50}
      backgroundColor={backgroundColor || colors.primary}
      _pressed={{ backgroundColor: darken(0.1, (backgroundColor || colors.primary)) }}
      _text={{
        fontSize: 16,
        fontWeight: '500',
        ...textStyle
      }}
      marginVertical={props.marginVertical || 0}
    >
      {text}
    </Button>
  )
}
export default HButton;

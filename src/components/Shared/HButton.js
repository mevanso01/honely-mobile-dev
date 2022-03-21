import * as React from 'react';
import { Button } from 'native-base'
import { darken } from 'polished'
import { colors } from '../../utils/styleGuide'

const HButton = (props) => {
  const {
    text,
    backgroundColor,
    borderColor,
    textStyle,
    variant
  } = props

  return (
    <Button
      size={props.size || 12}
      onPress={props.onPress}
      shadow={props.shadow || '3'}
      width={props.width || 180}
      borderRadius={props.borderRadius || 50}
      backgroundColor={backgroundColor || colors.primary}
      borderColor={borderColor || colors.primary}
      _pressed={{
        backgroundColor: darken(0.1, (backgroundColor || colors.primary)),
        borderColor: darken(0.1, (borderColor || colors.primary)),
      }}
      _text={{
        fontSize: 16,
        fontWeight: '500',
        color: colors.white,
        ...textStyle
      }}
      _disabled={{
        opacity: props.disabledOpacity || 1
      }}
      marginVertical={props.marginVertical || 0}
      variant={variant || 'default'}
      isDisabled={props.isDisabled || false}
    >
      {text}
    </Button>
  )
}
export default HButton;

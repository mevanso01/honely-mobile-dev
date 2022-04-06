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
      shadow={props.shadow || null}
      width={props.width || 247}
      height={50}
      borderRadius={props.borderRadius || 50}
      backgroundColor={backgroundColor || colors.primary}
      borderColor={borderColor || colors.primary}
      _pressed={{
        backgroundColor: darken(0.1, (backgroundColor || colors.primary)),
        borderColor: darken(0.1, (borderColor || colors.primary)),
      }}
      _text={{
        fontSize: 20,
        fontWeight: '700',
        color: colors.white,
        ...textStyle
      }}
      _disabled={{
        opacity: props.disabledOpacity || 1
      }}
      marginVertical={props.marginVertical || 0}
      variant={variant || 'default'}
      isDisabled={props.isDisabled || false}

      isLoading={props.isLoading}
      spinnerPlacement={props.spinnerPlacement || 'end'}
      isLoadingText={props.isLoadingText || 'Submitting'}
      {...props}
    >
      {text}
    </Button>
  )
}
export default HButton;

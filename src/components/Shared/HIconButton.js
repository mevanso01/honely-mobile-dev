import * as React from 'react'
import styled, { useTheme } from 'styled-components/native'

const Wrapper = styled.TouchableOpacity`
  height: 40px;
  border-radius: 20px;
  flex-direction: row;
  border: 1px solid white;
  padding-horizontal: 10px;
  align-items: center;
  justify-content: center;
`
const DisabledWrapper = styled.View`
  height: 40px;
  border-radius: 20px;
  flex-direction: row;
  border: 1px solid white;
  padding-horizontal: 10px;
  align-items: center;
    justify-content: center;
`
const Icon = styled.Image`
  width: 22px;
  height: 22px;
`
const Title = styled.Text`
  font-size: 16px;
  margin-horizontal: 7px;
`

const HIconButton = (props) => {
  const { RenderIcon } = props
  const theme = useTheme()

  return (
    <>
      {!props.disabled ? (
        <Wrapper
          onPress={props.onClick}
          style={{
            borderColor: props.borderColor || props.color,
            backgroundColor: props.isOutline ? 'white' : props.bgColor || props.color,
            height: props.height || 40,
            borderRadius: props.height ? props.height * 0.5 : 20,
            ...props.style
          }}
        >
          {props.icon && typeof props.icon !== 'object' ? (
            <Icon
              source={props.icon}
              style={{
                tintColor: props.iconColor,
                ...props.iconStyle
              }}
            />
          ) : null}
          {RenderIcon ? (
            <RenderIcon />
          ) : null}
          {props.title ? (
            <Title style={{
              color: props.textColor || props.color,
              ...props.textStyle
            }}
            >
              {props.title}
            </Title>
          ) : null}
        </Wrapper>
      ) : (
        <DisabledWrapper
          style={{
            borderColor: theme.colors.borderColor,
            backgroundColor: props.disabledColor ? props.disabledColor : theme.colors.borderColor,
            height: props.height || 40,
            borderRadius: props.height ? props.height * 0.5 : 20,
            ...props.style
          }}
        >
          {props.icon ? (
            <Icon
              source={props.urlIcon ? { uri: props.icon } : props.icon}
              resizeMode={props.cover ? 'cover' : 'contain'}
              style={{
                tintColor: props.iconColor,
                ...props.iconStyle
              }}
            />
          ) : null}
          {RenderIcon ? (
            <RenderIcon />
          ) : null}
          {props.title ? (
            <Title style={{
              color: props.textColor || props.color,
              ...props.textStyle
            }}
            >
              {props.title}
            </Title>
          ) : null}
        </DisabledWrapper>
      )}
    </>
  )
}

export default HIconButton;

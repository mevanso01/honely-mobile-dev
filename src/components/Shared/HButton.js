import * as React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';

const StyledButton = styled.View`
  background-color: ${props => props.theme.colors.primary};
  border-radius: 30px;
  border-width: 1px;
  height: 50px;
  border-color: ${props => props.theme.colors.primary};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 8px 8px 24px #1a1d1b2b;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
`
const StyledButtonDisabled = styled(StyledButton)`
  background-color: ${props => props.theme.colors.disabled};
  border-color: ${props => props.theme.colors.disabled};
`

const StyledText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #FFFFFF;
  margin-left: 10px;
  margin-right: 10px;
`

const StyledTextDisabled = styled(StyledText)`
  color: ${props => props.theme.colors.primary};
`

const StyledImage = styled.Image`
  width: 20px;
  height: 20px;
  resize-mode: contain;
`
const EndImage = styled.Image`
  width: 15px;
  height: 15px;
  resize-mode: contain;
  position: absolute;
  right: 20px;
`;

const HButton = (props) => {
  if (props.isDisabled) {
    return (
      <View style={props.parentStyle}>
      <StyledButtonDisabled style={props.style}>
        <StyledTextDisabled style={props.textStyle} {...props.textProps}>
          {props.text}
        </StyledTextDisabled>
      </StyledButtonDisabled>
      </View>
    );
  }

  if (props.isLoading) {
    return (
      <StyledButton style={props.style}>
        <ActivityIndicator size="small" color={props.indicatorColor} style={props.loadingStyle}/>
      </StyledButton>
    );
  }

  return (
    <TouchableOpacity
      testID={props.testID}
      activeOpacity={props.activeOpacity}
      onPress={props.onClick}
      style={{ width: props.isCircle ? 52 : props.style?.width, ...props.parentStyle }}
    >
      <StyledButton style={props.bgColor ? { ...props.style, backgroundColor: props.bgColor, borderColor: props.borderColor } : props.style}>
        {props.imgLeftSrc ? (
          <StyledImage style={{transform: [{scaleX: 1}], ...props.imgLeftStyle}} source={props.imgLeftSrc} />
        ) : null}
        {props.text ? (
          <StyledText
            style={props.textStyle}
            {...props.textProps}
          >
            {props.text}
          </StyledText>
        ) : null}
        {props.imgRightSrc ? (
          <EndImage style={props.imgRightStyle} source={props.imgRightSrc} />
        ) : null}
      </StyledButton>
    </TouchableOpacity>
  );
}

HButton.defaultProps = {
  isLoading: false,
  isDisabled: false,
  indicatorColor: 'white',
  activeOpacity: 0.5
};

export default HButton;

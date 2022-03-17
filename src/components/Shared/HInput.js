import * as React from 'react';
import styled from 'styled-components/native';
import HImage from './HImage';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const Wrapper = styled.View`
  background-color: ${(props) => props.theme.colors.backgroundColor};
  border-radius: 8px;
  border-width: 1px;
  padding-horizontal: 16px;
  height: 55px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

const Input = styled.TextInput`
  flex-grow: 1;
  flex: 1;
  min-height: 30px;
  font-size: ${(props) => props.textSize && `${props.textSize}px` || `15px`};
`;

const HInput = (props) => {
  return (
    <Wrapper
      style={{
        backgroundColor: props.bgColor,
        borderColor: props.borderColor,
        ...props.style,
      }}>
      {props.icon ? (
        <HImage
          src={props.icon}
          color={props.iconColor}
          width={20}
          height={20}
          style={{ ...props.iconStyle, marginRight: 10}}
        />
      ) : null}
      {props.vertorIcon && (
        <MaterialIcon name={props?.vertorIcon} size={20} color={props?.vectorIconColor} style={{marginHorizontal: 10}} />
      )}
      <Input
        name={props.name}
        secureTextEntry={props.isSecured}
        onChangeText={(txt) => props.name ? props.onChange({target: {name: props.name, value: txt}}) : props.onChange(txt)}
        defaultValue={props.value}
        placeholder={props.placeholder ? props.placeholder : ''}
        placeholderTextColor={props.placeholderTextColor}
        keyboardType={props.type || 'default'}
        multiline={props.multiline}
        scrollEnabled={props.multiline}
        editable={!props.isDisabled}
        autoCapitalize={props.autoCapitalize}
        autoCompleteType={props.autoCompleteType}
        autoCorrect={props.autoCorrect}
        returnKeyType={props.returnKeyType}
        onSubmitEditing={props.onSubmitEditing}
        blurOnSubmit={props.blurOnSubmit}
        ref={props.forwardRef}
        textSize={props.textSize}
        style={props.textInputStyle}
      />
      {props.iconRight && (
        <HImage
          src={props.iconRight}
          color={props.iconRightColor}
          width={20}
          height={20}
          style={{ ...props.iconRightStyle }}
        />
      )}
      {props.iconCustomRight}
    </Wrapper>
  );
};

export default HInput;

import * as React from 'react';
import styled, { css } from 'styled-components/native';

const SText = styled.Text`
  color: ${props => props.color || '#1A1D1B'};
  font-size: ${props => (props.size ? `${props.size}px` : '14px')};
  flex-wrap: wrap;
  margin-bottom: ${props =>
    props.hasBottom ? '10px' : props.mBottom ? `${props.mBottom}px` : 0};
  margin-right: ${props =>
    props.hasBottom ? '10px' : props.mRight ? `${props.mRight}px` : 0};
  margin-left: ${props =>
    props.hasBottom ? '10px' : props.mLeft ? `${props.mLeft}px` : 0};
  ${props =>
    props.weight &&
    css`
      font-weight: ${props.weight};
    `};
  ${props =>
    props.isWrap &&
    css`
      flex: ${props.weight ? 1 : 0};
    `};
`;

const HText = (props) => {
  return (
    <SText {...props} style={props.style}>
      {props.children}{props.space && ' '}
    </SText>
  );
};

export default HText;

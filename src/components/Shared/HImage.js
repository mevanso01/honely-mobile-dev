
import * as React from 'react'
import styled from 'styled-components/native'
import { colors } from '../../utils/styleGuide'

const Wrapper = styled.View``

const SImage = styled.Image`
  tint-color: ${colors.primary};
`

const HImage = (props) => {

  return (
    <Wrapper style={{ borderRadius: props.style?.borderRadius, overflow: 'hidden', marginHorizontal: props.style?.marginHorizontal }}>
      <SImage
        source={props.src ? props.src : props.url ? { uri: props.url } : props.dummy}
        style={{
          tintColor: props.color,
          flex: props.isWrap ? 1 : 0,
          width: props.width,
          height: props.height,
          marginHorizontal: 0,
          borderRadius: props.borderRadius,
          ...props.style,
        }}
        resizeMode={props.cover ? 'cover' : 'contain'}
      >
        {props.children}
      </SImage>
    </Wrapper>
  )
}

HImage.defaultProps = {
  width: 26,
  height: 26
}

export default HImage;

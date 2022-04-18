import React from 'react'
import { Switch } from 'react-native-switch'
import { colors } from '../../utils/styleGuide'

const HSwitch = (props) => {
  const {
    value,
    onValueChange
  } = props
  return (
    <Switch
      value={value || false}
      onValueChange={val => onValueChange(val)}
      circleSize={30}
      barHeight={32}
      circleBorderWidth={2}
      circleBorderActiveColor={colors.primary}
      circleBorderInactiveColor={colors.gray}
      backgroundActive={colors.primary}
      backgroundInactive={colors.gray}
      circleActiveColor={colors.white}
      circleInActiveColor={colors.white}
      changeValueImmediately={true}
      innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
      renderActiveText={false}
      renderInActiveText={false}
      switchLeftPx={3}
      switchRightPx={3}
      switchWidthMultiplier={1.7}
      switchBorderRadius={30}
      disabled={props.disabled || false}
    />
  )
}

export default HSwitch

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton } from 'native-base'
import HText from './HText'
import { colors } from '../../utils/styleGuide'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const HScreenHeader = (props) => {
  const {
    title
  } = props

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 48,
    },
    backArrow: {
      position: 'absolute',
      left: -10
    },
    title: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text01,
    },
  })
  return (
    <View style={styles.header}>
      <View style={styles.backArrow}>
        <IconButton
          borderRadius='full'
          variant='ghost'
          size='8'
          _icon={{
            as: MaterialIcons,
            name: 'chevron-left',
            color: colors.black,
          }}
          _pressed={{
            bg: colors.text05
          }}
          onPress={props.onPress}
        />
      </View>
      <HText style={styles.title}>{title}</HText>
    </View>
  )
}

export default HScreenHeader
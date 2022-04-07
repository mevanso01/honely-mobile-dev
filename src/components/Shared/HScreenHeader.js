import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { IconButton, Pressable } from 'native-base'
import HText from './HText'
import { colors, icons } from '../../utils/styleGuide'
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
    title: {
      fontSize: 17,
      fontWeight: '700',
      color: colors.text01,
    },
    arrowIcon: {
      width: 24,
      height: 24,
      tintColor: colors.black,
      resizeMode: 'contain'
    }
  })
  return (
    <View style={styles.header}>
      <Pressable
        onPress={props.onPress}
        position='absolute'
        left={-10}
        width={30}
        height={30}
        alignItems='center'
        justifyContent='center'
        _pressed={{
          backgroundColor: colors.text05,
          borderRadius: 15
        }}
      >
        <Image
          source={icons.arrowLeft}
          style={styles.arrowIcon}
        />
      </Pressable>
      <HText style={styles.title}>{title}</HText>
    </View>
  )
}

export default HScreenHeader
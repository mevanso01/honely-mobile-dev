import { StyleSheet } from 'react-native'
import { colors } from '../../utils/styleGuide'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: 18
  },
  title: {
    fontSize: 22,
    lineHeight: 33,
    fontWeight: '600',
    color: colors.text01
  },
})

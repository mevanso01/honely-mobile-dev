import { StyleSheet, Platform } from 'react-native'
import { colors } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 10 : 40,
    paddingBottom: 40,
    paddingHorizontal: 18
  },
  logo: {
    width: 187,
    height: 70,
    resizeMode: 'contain',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 32
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 16,
    color: colors.text01,
    marginTop: 20
  },
  description: {
    textAlign: 'center',
    color: colors.text02,
    fontSize: 14,
    lineHeight: 17
  },
  slideImage: {
    resizeMode: 'contain',
    flex: 1,
  },
  paginationStyle: {
    bottom: 0
  }
})

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
    resizeMode: 'contain'
  },
  slide: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 16,
    color: colors.text01,
    marginTop: 40
  },
  description: {
    textAlign: 'center',
    color: colors.text02,
    fontSize: 14,
    lineHeight: 17
  },
  slideImage: {
    width: deviceWidth * 0.7,
    height: deviceWidth * 0.7,
    resizeMode: 'cover',
  },
})

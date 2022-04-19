import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../utils/styleGuide'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18
  },
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 25,
    lineHeight: 33,
    color: colors.text01,
    textAlign: 'center',
    fontFamily: fonts.bold
  },
  optionText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: colors.text02
  },
  arrowIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: colors.primary
  }
})

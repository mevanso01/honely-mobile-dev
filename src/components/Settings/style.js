import { StyleSheet } from 'react-native';
import { colors } from '../../utils/styleGuide'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18
  },
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 22,
    lineHeight: 33,
    fontWeight: '600',
    color: colors.text01
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
    tintColor: colors.black
  }
})

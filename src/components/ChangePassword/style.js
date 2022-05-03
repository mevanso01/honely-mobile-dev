import { StyleSheet, Platform } from 'react-native';
import { colors, fonts } from '../../utils/styleGuide'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 10 : 40,
    paddingHorizontal: 18
  },
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 25,
    lineHeight: 33,
    color: colors.text01,
    textAlign: 'center',
    fontFamily: fonts.bold
  },
  visibilityIconWrapper: {
    marginRight: 16
  },
  visibilityIcon: {
    width: 24,
    height: 24,
    tintColor: colors.text04,
  },
})

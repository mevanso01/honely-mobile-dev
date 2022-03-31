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
  title: {
    fontSize: 22,
    lineHeight: 33,
    fontWeight: '600',
    color: colors.text01
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

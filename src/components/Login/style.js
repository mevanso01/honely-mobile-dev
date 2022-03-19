import { StyleSheet } from 'react-native';
import { colors } from '../../utils/styleGuide'

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 18
  },
  label: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: colors.headingColor
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginLeft: 5
  },
  forgotLink: {
    alignSelf: 'flex-end',
    marginTop: 16
  }
})

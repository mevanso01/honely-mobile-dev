import { StyleSheet, Platform } from 'react-native';
import { colors } from '../../utils/styleGuide'

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 10 : 40,
    paddingHorizontal: 18
  },
  label: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: colors.headingColor
  },
  errorTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginLeft: 5
  },
  forgotLink: {
    alignSelf: 'flex-end',
    marginTop: 16
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginLeft: 16
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

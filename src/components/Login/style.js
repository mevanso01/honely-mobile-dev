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
  signUpFormWrapper: {
    marginVertical: 32
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 33,
    marginBottom: 8,
    color: colors.text01
  },
  description: {
    color: colors.text02,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center'
  },
  stepButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 48,
  },
  stepTitle: {
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 8
  }
})

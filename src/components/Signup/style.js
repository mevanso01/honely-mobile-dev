import { StyleSheet } from 'react-native';
import { colors } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'

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
    fontSize: 25,
    fontWeight: '700',
    lineHeight: 33,
    marginBottom: 20,
    color: colors.text01
  },
  description: {
    color: colors.text02,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center'
  },
  stepButtonContainer: {
    flex: 1,
    paddingTop: 24,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 48,
  },
  stepTitle: {
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 8
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  checkboxText: {
    color: colors.text01,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    marginLeft: 8,
  },
  underlineText: {
    color: colors.primary,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    textDecorationLine: 'underline'
  },
  successWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupCompleteTitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    textAlign: 'center'
  },
  logoWrapper: {
    width: 181,
    height: 65,
    resizeMode: 'contain',
    marginBottom: 24
  },
  congratsText: {
    color: colors.text01,
    fontWeight: '600',
    fontSize: 22,
    lineHeight: 33
  },
  loadingText: {
    color: colors.text03,
    fontSize: 16,
    marginTop: 60,
    marginBottom: 10
  },
  otpView: {
    width: (deviceWidth - 48),
    height: 55,
    alignSelf: 'center',
    paddingVertical: 0
  },
  otpInputStyle: {
    width: (deviceWidth - 48 - 20) / 6,
    height: 55,
    borderRadius: 8,
    borderColor: colors.borderColor,
    color: colors.primary,
    fontSize: 27
  },
  underlineStyleHighLighted: {
    borderColor: colors.primary,
  }
})

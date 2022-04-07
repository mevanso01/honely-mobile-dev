import { StyleSheet } from 'react-native'
import { colors } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 18
  },
  subtitle: {
    fontSize: 25,
    fontWeight: '700',
    lineHeight: 25,
    marginBottom: 21,
    color: colors.text01
  },
  description: {
    color: colors.text02,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center'
  },
  label: {
    fontSize: 17,
    lineHeight: 17,
    fontWeight: '400',
    color: colors.headingColor,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginLeft: 5
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
  },
  changeSuccessText: {
    fontSize: 25,
    lineHeight: 29,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
    maxWidth: 304
  },
  forgotPasswordImgWrapper: {
    width: deviceWidth * 0.77,
    alignSelf: 'center',
    marginTop: 50
  },
  forgotPasswordImg: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%'
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

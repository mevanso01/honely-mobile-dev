import { StyleSheet } from 'react-native'
import { colors } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 18
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

  otpView: {
    width: 332,
    height: 55,
    alignSelf: 'center',
    paddingVertical: 0
  },
  underlineStyleBase: {
    width: 80,
    height: 55,
    borderRadius: 8,
    borderColor: colors.borderColor,
    color: colors.text01,
  },
  underlineStyleHighLighted: {
    borderColor: colors.primary,
  },
  changeSuccessText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: colors.text01,
    textAlign: 'center',
    maxWidth: 162
  },
  forgotPasswordImgWrapper: {
    width: deviceWidth - 36,
    paddingRight: 29
  },
  forgotPasswordImg: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    borderWidth: 1
  }
})
